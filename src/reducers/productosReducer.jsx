import { CARGANDO, CARGANDO_COMPLETO, OBTENER_PRODUCTO, OBTENER_PRODUCTOS, EDITAR_PRODUCTO_CANCELAR, EDITAR_PRODUCTO_PREGUNTA, EDITAR_PRODUCTO_EDITAR, ELIMINAR_PRODUCTO_BORRAR, ELIMINAR_PRODUCTO_CANCELAR, ELIMINAR_PRODUCTO_PREGUNTA ,OBTENER_PRODUCTOS_ADMIN, AGREGAR_PROMOCION_PREGUNTA, AGREGAR_PROMOCION_CANCELAR, AGREGAR_PROMOCION_AGREGAR } from "../types/typesProductos";

const initialState = {
    productos: [],
    productosAdmin: [],
    productoPromocion: {},
    productoBorrar: {},
    productoEditar: {},
    producto: null,
    cargando: false
}

export default function(state = initialState, action){
    switch(action.type){
        case OBTENER_PRODUCTOS_ADMIN:
            return{
                ...state,
                productosAdmin: action.payload.data.results,
                cargando: false
            }
        case OBTENER_PRODUCTOS:
            return{
                ...state,
                productos: action.payload.data.results,
                cargando: false
            }
        case AGREGAR_PROMOCION_PREGUNTA:
            return{
                ...state,
                productoPromocion: action.payload
            }
        case AGREGAR_PROMOCION_CANCELAR:
            return{
                ...state,
                productoPromocion: {}
            }
        case AGREGAR_PROMOCION_AGREGAR:
            return{
                ...state,
                productoPromocion: {},
                productosAdmin: state.productosAdmin.map(producto => producto._id !== action.payload._id ? producto : action.payload)
            }
        case ELIMINAR_PRODUCTO_PREGUNTA:
            return{
                ...state,
                productoBorrar: action.payload
            }
        case ELIMINAR_PRODUCTO_CANCELAR:
            return{
                ...state,
                productoBorrar: {}
            }
        case ELIMINAR_PRODUCTO_BORRAR:
            return{
                ...state,
                productoBorrar: {},
                productosAdmin: state.productosAdmin.filter(producto => producto._id !== action.payload._id)
            }
        case EDITAR_PRODUCTO_PREGUNTA:
            return{
                ...state,
                productoEditar: action.payload
            }
        case EDITAR_PRODUCTO_CANCELAR:
            return{
                ...state,
                productoEditar: {}
            }
        case EDITAR_PRODUCTO_EDITAR:
            return{
                ...state,
                productoEditar: {},
                productosAdmin: state.productosAdmin.map(producto => producto._id !== action.payload._id ? producto : action.payload)
            }
        case OBTENER_PRODUCTO:
            return{
                ...state,
                producto: action.payload.data.results[0],
                cargando: false
            }
        case CARGANDO:
            return{
                ...state,
                cargando: true
            }
        case CARGANDO_COMPLETO:
            return{
                ...state,
                cargando: false
            }
        default:
            return state;
    }
}