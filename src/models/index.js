// import Usuario from "./usuarioModel.js";
// import Cupoms from "./cupomsModel.js";
// import Adresses from "./adressesModel.js";
// import Payments from "./paymentsModel.js";
// import Orders from "./ordersModel.js";
// import Products from "./productsModel.js";
// import OrdersProducts from "./ordersProductsModel.js";
// import Categories from "./categoriesModel.js";

// (async () => {
//     try {
//         await Usuario.sync({ force: true });
//         console.log("Tabela 'usuarios' criada com sucesso!");

//         await Cupoms.sync({ force: true });
//         console.log("Tabela 'cupoms' criada com sucesso!");

//         await Payments.sync({ force: true });
//         console.log("Tabela 'payments' criada com sucesso!");

//         await Adresses.sync({ force: true });
//         console.log("Tabela 'adresses' criada com sucesso!");

//         await Orders.sync({ force: true });
//         console.log("Tabela 'orders' criada com sucesso!");

//         await Categories.sync({ force: true });
//         console.log("Tabela 'categories' criada com sucesso!");

//         await Products.sync({ force: true });
//         console.log("Tabela 'products' criada com sucesso!");

//         await OrdersProducts.sync({ force: true });
//         console.log("Tabela 'orders_products' criada com sucesso!");
//     } catch (error) {
//         console.error("Erro ao sincronizar tabelas:", error);
//     }
// })();