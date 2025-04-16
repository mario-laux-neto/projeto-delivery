const getALL = (req, res) => {
    return res.status(200).send({
        message: 'todos os livros',
    });
}

const getID = (req, res) => {
    const { idlivro } = req.params;

    return res.status(200).send({
        message: 'livros:', idlivro
    });
}

const create = (req, res) => {
    const { nomeLivro, descLivro } = req.body;

    return res.status(201).send({
        message: 'Livro criado',
        data: {
            nomeLivro,
            descLivro
        }
    });
}

export default {
    getALL,
    getID,
    create,
}