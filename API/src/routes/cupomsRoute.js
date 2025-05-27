import cupomController from "../controllers/cupomsController.js"; // Import atualizado

export default (app) => {
  app.get('/cupom', cupomController.get);
  app.get('/cupom/:id', cupomController.get);
  app.post('/cupom', cupomController.persist);
  app.patch('/cupom/:id', cupomController.persist);
  app.delete('/cupom/:id', cupomController.destroy);
}