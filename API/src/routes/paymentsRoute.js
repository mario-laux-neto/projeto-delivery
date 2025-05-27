import paymentController from "../controllers/paymentsController.js"; // Import atualizado

export default (app) => {
  app.get('/payment', paymentController.get);
  app.get('/payment/:id', paymentController.get);
  app.post('/payment', paymentController.persist);
  app.patch('/payment/:id', paymentController.persist);
  app.delete('/payment/:id', paymentController.destroy);
}