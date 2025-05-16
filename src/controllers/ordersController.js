import Orders from "../models/ordersModel.js";
import OrdersProducts from "../models/ordersProductsModel.js";
import Products from "../models/productsModel.js";
import Cupoms from "../models/cupomsModel.js";
import { sequelize } from "../config/delivery.js";

// Verificar histórico de pedidos do usuário
const getOrderHistory = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send({
            message: "Usuário não fornecido.",
        });
    }

    try {
        const orders = await Orders.findAll({
            where: { id_user_costumer: userId },
            include: [
                {
                    model: OrdersProducts,
                    include: [Products],
                },
            ],
            order: [["created_at", "DESC"]],
        });

        res.status(200).json(orders);
    } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        res.status(500).json({ error: "Erro ao buscar histórico de pedidos." });
    }
};

// Criar um pedido com produtos associados
const create = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const {
            status,
            total,
            total_discount,
            id_user_costumer,
            id_user_deliver,
            id_address,
            id_payment,
            id_cupom,
            products,
        } = req.body;

        if (!status || !total || !id_user_costumer || !id_address || !id_payment || !products || products.length === 0) {
            return res.status(400).send({
                message: "Campos obrigatórios estão faltando ou lista de produtos está vazia.",
            });
        }

        const validStatuses = ["pendente", "em andamento", "concluído"];
        if (!validStatuses.includes(status)) {
            return res.status(400).send({
                message: "Status inválido.",
            });
        }

        let cupom = null;
        if (id_cupom) {
            cupom = await Cupoms.findByPk(id_cupom);
            if (!cupom) {
                return res.status(400).send({ message: "Cupom inválido." });
            }
        }

        const order = await Orders.create(
            {
                status,
                total,
                total_discount: total_discount || (cupom ? cupom.value : 0),
                id_user_costumer,
                id_user_deliver: id_user_deliver || null,
                id_address,
                id_payment,
                id_cupom,
            },
            { transaction }
        );

        for (const product of products) {
            const { id_product, quantity, price_at_time } = product;

            const existingProduct = await Products.findByPk(id_product);
            if (!existingProduct) {
                await transaction.rollback();
                return res.status(400).send({ message: `Produto com ID ${id_product} não encontrado.` });
            }

            await OrdersProducts.create(
                {
                    id_order: order.id,
                    id_product,
                    quantity,
                    price_at_time: price_at_time || existingProduct.price,
                },
                { transaction }
            );
        }

        await transaction.commit();

        return res.status(201).send({
            message: "Pedido criado com sucesso!",
            data: order,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).send({
            message: error.message,
        });
    }
};

// Atualizar status do pedido
const updateStatus = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;

        if (!id) {
            return res.status(400).send("Informe o ID do pedido");
        }

        const order = await Orders.findOne({ where: { id } });
        if (!order) {
            return res.status(404).send("Pedido não encontrado");
        }

        const { status } = req.body;
        const validStatuses = ["pendente", "em andamento", "concluído"];
        if (!validStatuses.includes(status)) {
            return res.status(400).send("Status inválido");
        }

        order.status = status;
        await order.save();

        return res.status(200).send({
            message: "Status do pedido atualizado com sucesso!",
            data: order,
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

// Deletar pedido
const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;

        if (!id) {
            return res.status(400).send("Informe o ID do pedido");
        }

        const response = await Orders.findOne({
            where: {
                id,
            },
        });

        if (!response) {
            return res.status(404).send("Pedido não encontrado");
        }

        await response.destroy();

        return res.status(200).send({
            message: "Pedido excluído com sucesso!",
            data: response,
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

export default {
    getOrderHistory,
    create,
    updateStatus,
    destroy,
};