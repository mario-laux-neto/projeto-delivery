import livroRoute from "./livroRoute.js";
import pessoaRoute from "./pessoaRoute.js";
import clienteRoute from "./clienteRoute.js";
import emprestimoRoute from "./emprestimoRoute.js";

function Routes(app) {
    livroRoute(app);
    pessoaRoute(app);
    clienteRoute(app);
    emprestimoRoute(app);
}

export default Routes;