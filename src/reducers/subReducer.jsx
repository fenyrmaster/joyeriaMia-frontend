import { CREAR_SUB_EXITO, CREAR_SUB_FALLO, ELIMINAR_SUB_PREGUNTA, ELIMINAR_SUB_CANCELAR, EDITAR_SUB_PREGUNTA, EDITAR_SUB_CANCELAR, EDITAR_SUB_EDITAR, OBTENER_SUB_ADMIN, ELIMINAR_SUB_BORRAR, OBTENER_SUB } from "../types/typesSub";

const initialState = {
    subcategorias: [],
    subEditar: {},
    subEliminar: {},
    subAdmin: []
}

export default function(state = initialState, action){
    switch(action.type){
        case OBTENER_SUB_ADMIN:
            return{
                ...state,
                subAdmin: action.payload.data.results
            }
        case CREAR_SUB_EXITO:
            return{
                ...state,
                subAdmin: [...state.subAdmin, action.payload]
            }
        case ELIMINAR_SUB_PREGUNTA:
            return{
                ...state,
                subEliminar: action.payload
            }
        case ELIMINAR_SUB_CANCELAR:
            return{
                ...state,
                subEliminar: {}
            }
        case ELIMINAR_SUB_BORRAR:
            return{
                ...state,
                subEliminar: {},
                subAdmin: state.subAdmin.filter(subs => subs._id !== action.payload._id)
            }
        case EDITAR_SUB_PREGUNTA:
            return{
                ...state,
                subEditar: action.payload
            }
        case EDITAR_SUB_CANCELAR:
            return{
                ...state,
                subEditar: {}
            }
        case EDITAR_SUB_EDITAR:
            return{
                ...state,
                subEditar: {},
                subAdmin: state.subAdmin.map(sub => sub._id !== action.payload._id ? sub : action.payload)
            }
        case OBTENER_SUB:
            return{
                ...state,
                subcategorias: action.payload.data.results
            }
        default:
            return state;
    }
}