import categoriesController from "../controllers/categoriesController.js";

export default (app) => {
    app.get('/categories', categoriesController.get); // Lista todas as categorias ou busca por ID
    app.post('/categories', categoriesController.create); // Cria uma nova categoria
    app.put('/categories/:id', categoriesController.update); // Atualiza uma categoria existente
    app.delete('/categories/:id', categoriesController.destroy); // Deleta uma categoria
};