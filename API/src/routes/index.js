import usuarioRoute from "./usuarioRoute.js";
import adressesRoute from "./adressesRoute.js";
import cupomsRoute from "./cupomsRoute.js";
import paymentsRoute from "./paymentsRoute.js";
import ordersRoute from "./ordersRoute.js";
import ordersProductsRoute from "./ordersProductsRoute.js";
import productsRoute from "./productsRoute.js";
import categoriesRoute from "./categoriesRoute.js";

export default (app) => {
    usuarioRoute(app);
    adressesRoute(app);
    cupomsRoute(app);
    paymentsRoute(app);
    ordersRoute(app);
    ordersProductsRoute(app);
    productsRoute(app);
    categoriesRoute(app);
};