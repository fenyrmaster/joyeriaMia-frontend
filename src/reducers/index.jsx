import { combineReducers } from "redux";
import alertasReducer from "./alertasReducer";
import usuariosReducer from "./usuariosReducer";
import subReducer from "./subReducer";
import productosReducer from "./productosReducer";
import pedidosReducer from "./pedidosReducer";

export default combineReducers({
    Alerta: alertasReducer,
    Usuario: usuariosReducer,
    Subcategoria: subReducer,
    Producto: productosReducer,
    Pedido: pedidosReducer
});