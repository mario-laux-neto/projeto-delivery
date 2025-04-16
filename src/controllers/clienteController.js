import Emprestimo from '../models/EmprestimoModel.js';

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Emprestimo.findAll({
                order: [['id', 'desc']],
                include: [{ association: 'cliente' }] // Inclui dados do cliente
            });

            return res.status(200).send({
                message: 'Empréstimos encontrados',
                data: response,
            });
        }

        const response = await Emprestimo.findOne({
            where: { id },
            include: [{ association: 'cliente' }] // Inclui dados do cliente
        });

        if (!response) {
            return res.status(404).send('Empréstimo não encontrado');
        }

        return res.status(200).send({
            message: 'Empréstimo encontrado',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const create = async (corpo) => {
    try {
        const { idCliente, dataEmprestimo } = corpo;

        // Verifica se o cliente existe
        const cliente = await Cliente.findOne({ where: { id: idCliente } });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const response = await Emprestimo.create({
            idCliente,
            dataEmprestimo: dataEmprestimo || new Date() // Usa a data atual se não for informada
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
            throw new Error('Empréstimo não encontrado');
        }

        // Verifica se o cliente existe (se estiver sendo atualizado)
        if (corpo.idCliente) {
            const cliente = await Cliente.findOne({ where: { id: corpo.idCliente } });
            if (!cliente) {
                throw new Error('Cliente não encontrado');
            }
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
                message: 'Empréstimo criado com sucesso',
                data: response
            });
        } else {
            const response = await update(req.body, id);
            return res.status(200).send({
                message: 'Empréstimo atualizado com sucesso',
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
            return res.status(400).send('ID do empréstimo não informado');
        }

        const response = await Emprestimo.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Empréstimo não encontrado');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Empréstimo excluído com sucesso',
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
    create,
    update,
    persist,
    destroy
};