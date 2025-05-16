import Payments from "../models/paymentsModel.js";

// GET: Lista todos os métodos ou um específico por ID
const get = async (req, res) => {
    try {
        const id = req.params.id ? parseInt(req.params.id, 10) : null;

        if (!id) {
            const response = await Payments.findAll({
                order: [['id', 'desc']],
            });

            return res.status(200).send({
                message: 'Métodos de pagamento encontrados',
                data: response,
            });
        }

        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }

        const response = await Payments.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Método de pagamento não encontrado');
        }

        return res.status(200).send({
            message: 'Método de pagamento encontrado',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// POST: Cria novo método de pagamento
const create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ message: 'Nome do método de pagamento é obrigatório.' });
        }

        const response = await Payments.create({ name });

        return res.status(201).send({
            message: 'Método de pagamento criado com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// PUT: Atualiza um método de pagamento
const update = async (req, res) => {
    try {
        const id = req.params.id ? parseInt(req.params.id, 10) : null;

        if (!id || isNaN(id)) {
            return res.status(400).send('ID inválido');
        }

        const response = await Payments.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Método de pagamento não encontrado');
        }

        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ message: 'Campo "name" é obrigatório para atualização.' });
        }

        response.name = name;
        await response.save();

        return res.status(200).send({
            message: 'Método de pagamento atualizado com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// DELETE: Exclui método de pagamento
const destroy = async (req, res) => {
    try {
        const id = req.params.id ? parseInt(req.params.id, 10) : null;

        if (!id || isNaN(id)) {
            return res.status(400).send('ID inválido');
        }

        const response = await Payments.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Método de pagamento não encontrado');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Método de pagamento excluído com sucesso!',
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
