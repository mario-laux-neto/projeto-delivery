import OrdersProducts from "../models/ordersProductsModel.js";
import Products from "../models/productsModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        const data = id
            ? await OrdersProducts.findOne({ where: { id } })
            : await OrdersProducts.findAll({ order: [['id', 'desc']] });

        if (!data) {
            return res.status(404).send('Produto do pedido não encontrado');
        }

        return res.status(200).send({
            message: 'Produto(s) do pedido encontrado(s)',
            data,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { quantity, id_order, id_product } = req.body;

        // Verificar se o produto existe
        const product = await Products.findByPk(id_product);
        if (!product) {
            return res.status(400).send({ message: 'Produto inválido.' });
        }

        // Calcular o preço no momento
        const price_at_time = product.price;

        const response = await OrdersProducts.create({
            price_at_time,
            quantity,
            id_order,
            id_product,
        });

        return res.status(201).send({
            message: 'Produto do pedido criado com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id?.toString().replace(/\D/g, '');

        const response = await OrdersProducts.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Produto do pedido não encontrado');
        }

        Object.keys(req.body).forEach(key => {
            response[key] = req.body[key];
        });

        await response.save();

        return res.status(200).send({
            message: 'Produto do pedido atualizado com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id?.toString().replace(/\D/g, '');

        if (!id) {
            return res.status(400).send('Informe o ID do produto do pedido');
        }

        const response = await OrdersProducts.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Produto do pedido não encontrado');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Produto do pedido excluído com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export default {
    get,
    create,
    update,
    destroy,
};
