import Cupoms from "../models/cupomsModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Cupoms.findAll({
                order: [['id', 'desc']],
            });

            return res.status(200).send({
                message: 'Cupons encontrados',
                data: response,
            });
        }

        const response = await Cupoms.findOne({
            where: {
                id: id,
            },
        });

        if (!response) {
            return res.status(404).send('Cupom não encontrado');
        }

        return res.status(200).send({
            message: 'Cupom encontrado',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        const { code, type, value, uses } = req.body;

        const response = await Cupoms.create({
            code,
            type,
            value,
            uses,
        });

        return res.status(201).send({
            message: 'Cupom criado com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        const response = await Cupoms.findOne({
            where: {
                id,
            },
        });

        if (!response) {
            return res.status(404).send('Cupom não encontrado');
        }

        Object.keys(req.body).forEach((key) => {
            response[key] = req.body[key];
        });

        await response.save();

        return res.status(200).send({
            message: 'Cupom atualizado com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return res.status(400).send('Informe o ID do cupom');
        }

        const response = await Cupoms.findOne({
            where: {
                id,
            },
        });

        if (!response) {
            return res.status(404).send('Cupom não encontrado');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Cupom excluído com sucesso!',
            data: response,
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

// Endpoint para utilizar o cupom
const useCoupon = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
        const userId = req.user.id; // Supondo que você tenha a informação do usuário na sessão ou token

        const response = await Cupoms.findOne({
            where: {
                id,
            },
        });

        if (!response) {
            return res.status(404).send('Cupom não encontrado');
        }

        // Verifica se o cupom já foi usado por este usuário
        if (response.usedByUser.includes(userId)) {
            return res.status(400).send('Você já utilizou este cupom.');
        }

        // Verifica se o cupom ainda tem usos disponíveis
        if (response.uses > 0) {
            // Adiciona o userId à lista de usuários que usaram o cupom
            response.usedByUser.push(userId);

            // Decrementa o número de usos
            response.uses -= 1;

            // Se não houver mais usos, invalidamos o cupom
            if (response.uses <= 0) {
                response.isValid = false; // Opcional, dependendo de como você deseja gerenciar a validade
            }

            await response.save();

            return res.status(200).send({
                message: 'Cupom utilizado com sucesso!',
                data: response,
            });
        } else {
            return res.status(400).send('O cupom não pode ser utilizado. Limite de usos atingido.');
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

export default {
    get,
    create,
    update,
    destroy,
    useCoupon, // Exporte o novo endpoint
};
