import productsController from "../controllers/productsController.js";

export default (app) => {
    app.get('/products', productsController.get); // Lista todos os produtos ou busca por ID
    app.post('/products', productsController.create); // Cria um novo produto com upload de imagem
    app.put('/products/:id', productsController.update); // Atualiza um produto existente com upload de imagem
    app.delete('/products/:id', productsController.destroy); // Deleta um produto
};
