import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from "../types/typesAlertas";

const initialState = {
    clases: null,
    mensaje: null
}

export default function(state = initialState, action){
    switch(action.type){
        case MOSTRAR_ALERTA:
            return{
                ...state,
                clases: action.payload.clases,
                mensaje: action.payload.mensaje
            }
        case OCULTAR_ALERTA:
            return{
                ...state,
                clases: null,
                mensaje: null
            }
        default:
            return state;
    }
}