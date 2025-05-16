import usuarioController from "../controllers/usuarioController.js";


export default (app) => {
    app.get('/usuarios', usuarioController.get); 
    app.post('/usuarios', usuarioController.persist); 
    app.put('/usuarios/:id', usuarioController.persist); 
    app.delete('/usuarios/:id', usuarioController.destroy); 
};