import livroController from "../controllers/livroController.js";

export default (app) => {
    app.get('/livro', livroController.getALL);
    app.get('/livro/:idLivrp', livroController.getID);
    app.post('/livro', livroController.create);
}