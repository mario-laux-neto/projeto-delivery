import Cliente from "./ClienteModel.js";
import Emprestimo from "./Emprestimo.js";

( async () => {
 await Cliente.sync({ force:true });
 await Emprestimo.sync({ force:true})

})();