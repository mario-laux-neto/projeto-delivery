import userController from "../controllers/usuarioController.js";
import autenticarUserMiddleware from "../middlewares/autenticarUserMiddleware.js";

export default (app) => {
    app.get('/user', userController.get);
    app.get('/user/get-data-by-token', autenticarUserMiddleware, userController.getDataByToken);
    app.get('/user/:id', userController.get);
    app.post('/user', userController.persist);
    app.post('/user/login', userController.login);
    app.post('/user/esqueci-minha-senha', userController.recuperarSenha);
    app.post('/user/redefinir-senha', userController.redefinirSenha);
    app.patch('/user/:id', userController.persist);
    app.put('/user/:id/trocar-senha', userController.trocarSenha);
    app.delete('/user/:id/limpar-carrinho', userController.esvaziarCarrinho);
    app.delete('/user/:id', userController.destroy);
}