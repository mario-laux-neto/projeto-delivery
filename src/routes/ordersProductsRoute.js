import ordersProductsController from "../controllers/ordersProductsController.js";


export default (app) => {
    app.get('/orders_products', ordersProductsController.get);
    app.post('/orders_products', ordersProductsController.create);
    app.put('/orders_products/:id', ordersProductsController.update);
    app.delete('/orders_products/:id', ordersProductsController.destroy);

};

