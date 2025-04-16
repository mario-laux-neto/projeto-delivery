import Emprestimo from '../models/EmprestimoModel.js';

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Emprestimo.findAll({
                order: [['id', 'desc']],
            });

            return res.status(200).send({
                message: 'Dados encontrados',
                data: response,
            });
        }

        const response = await Emprestimo.findOne({
            where: { id }
        });

        if (!response) {
            return res.status(404).send('Não achou');
        }

        return res.status(200).send({
            message: 'Dados encontrados',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const create = async (corpo) => {
    try {
        const { dataEmprestimo } = corpo;

        const response = await Emprestimo.create({
            dataEmprestimo: dataEmprestimo || new Date() // Usa data atual se não informada
            // idCliente foi removido dos campos obrigatórios
        });

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (corpo, id) => {
    try {
        const response = await Emprestimo.findOne({ where: { id } });

        if (!response) {
            throw new Error('Não achou');
        }

        Object.keys(corpo).forEach((item) => {
            response[item] = corpo[item];
        });

        await response.save();

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const persist = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await create(req.body);
            return res.status(201).send({
                message: 'Criado com sucesso',
                data: response
            });
        } else {
            const response = await update(req.body, id);
            return res.status(200).send({
                message: 'Atualizado com sucesso',
                data: response
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return res.status(400).send('Informa ai paezao');
        }

        const response = await Emprestimo.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Não achou');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Registro excluído',
            data: response
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

export default {
    get,
    persist,
    destroy
};