import pessoaController from "../controllers/pessoaController.js";

export default (app) => {
  app.get('/pessoa', pessoaController.getALL);
  app.get('/pessoa/:id', pessoaController.getID);
  app.post('/verificar/:idade', pessoaController.verificarIdade);
};
