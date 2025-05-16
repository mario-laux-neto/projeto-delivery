import adressesController from "../controllers/adressesController.js";

export default (app) => {
  app.get('/adresses', adressesController.get); 
  app.post('/adresses', adressesController.persist);
  app.put('/adresses/:id', adressesController.persist); 
  app.delete('/adresses/:id', adressesController.destroy); 
};