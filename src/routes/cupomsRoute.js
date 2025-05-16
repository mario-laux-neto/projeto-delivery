import cupomsController from "../controllers/cupomsController.js";

export default (app) => {
    app.get('/cupoms', cupomsController.get); 
    app.post('/cupoms', cupomsController.create); 
    app.put('/cupoms/:id', cupomsController.update); 
    app.delete('/cupoms/:id', cupomsController.destroy); 
    app.post('/cupoms/:id/use', cupomsController.useCoupon); // Nova rota para usar o cupom
};
