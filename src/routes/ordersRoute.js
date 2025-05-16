import ordersController from "../controllers/ordersController.js"; // Importação correta

export default (app) => {
    app.get('/orders', ordersController.getOrderHistory); // Corrigir para usar a função correta
    app.post('/orders', ordersController.create);
    app.put('/orders/:id/status', ordersController.updateStatus);
    app.delete('/orders/:id', ordersController.destroy);
};