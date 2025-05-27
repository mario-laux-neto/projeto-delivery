import authController from '../controllers/authController.js';

export default (app) => {
  app.post('/login', authController.login);
};
