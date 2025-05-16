import paymentsController from "../controllers/paymentsController.js";

export default (app) => {
    app.get('/payments', paymentsController.get); // Lista todos os métodos
    app.get('/payments/:id', paymentsController.get); // Busca por ID
    app.post('/payments', paymentsController.create); // Cria método de pagamento
    app.put('/payments/:id', paymentsController.update); // Atualiza método de pagamento
    app.delete('/payments/:id', paymentsController.destroy); // Exclui método de pagamento
};
