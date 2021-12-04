import { CARGAR_SPINNER, OBTENER_PEDIDOS, OBTENER_PEDIDOS_ADMIN, QUITAR_SPINNER } from "../types/typesPedidos";

const initialState = {
    pedidos: [],
    pedidosAdmin: [],
    cargando: false
}

export default function(state = initialState, action){
    switch(action.type){
        case CARGAR_SPINNER:
            return{
                ...state,
                cargando: true
            }
        case QUITAR_SPINNER:
            return{
                ...state,
                cargando: false
            }
        case OBTENER_PEDIDOS:
            return{
                ...state,
                cargando: false,
                pedidos: action.payload.data.results
            }
        case OBTENER_PEDIDOS_ADMIN:
            return{
                ...state,
                cargando: false,
                pedidosAdmin: action.payload.data.results
            }
        default:
            return state;
    }
}