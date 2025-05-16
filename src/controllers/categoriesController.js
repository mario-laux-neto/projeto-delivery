import Categories from "../models/categoriesModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Categories.findAll({
                order: [['id', 'desc']],
            });

            return res.status(200).send({
                message: 'Categorias encontradas',
                data: response,
            });
        }

        const response = await Categories.findOne({
            where: {
                id: id,
            },
        });

        if (!response) {
            return res.status(404).send('Categoria não encontrada');
        }

        return res.status(200).send({
            message: 'Categoria encontrada',
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
        const { name } = req.body;

        const response = await Categories.create({
            name,
        });

        return res.status(201).send({
            message: 'Categoria criada com sucesso!',
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

        const response = await Categories.findOne({
            where: {
                id,
            },
        });

        if (!response) {
            return res.status(404).send('Categoria não encontrada');
        }

        Object.keys(req.body).forEach((key) => {
            response[key] = req.body[key];
        });

        await response.save();

        return res.status(200).send({
            message: 'Categoria atualizada com sucesso!',
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
            return res.status(400).send('Informe o ID da categoria');
        }

        const response = await Categories.findOne({
            where: {
                id,
            },
        });

        if (!response) {
            return res.status(404).send('Categoria não encontrada');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Categoria excluída com sucesso!',
            data: response,
        });
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
};