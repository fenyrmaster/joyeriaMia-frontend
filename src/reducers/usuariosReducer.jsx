import { QUITAR_SPINNER, CARGAR_SPINNER, CALCULAR_TOTAL, CAMBIAR_ENVIO, AGREGAR_CARRITO, CREAR_USUARIO_EXITO, CREAR_USUARIO_FALLO, CAMBIAR_CONTRASEÑA_EXITO, CAMBIAR_DATOS_PERSONALES_EXITO, CAMBIAR_DATOS_PERSONALES_FALLO, SALIR_CUENTA, COMENZAR_BUSQUEDA, RECORDAR_USUARIO_EXITO, RECORDAR_USUARIO_FALLO } from "../types/typesUsuario";

const initialState = {
    usuario: null,
    token: null,
    autenticado: false,
    cargando: true,
    cargaSpinner: false,
    tarjeta: null
}

export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_BUSQUEDA:
            return{
                ...state,
                cargando: true
            }
        case CARGAR_SPINNER:
            return{
                ...state,
                cargaSpinner: true
            }
        case QUITAR_SPINNER:
            return{
                ...state,
                cargaSpinner: false
            }
        case CREAR_USUARIO_EXITO:
        case RECORDAR_USUARIO_EXITO:
            return{
                ...state,
                usuario: action.payload.data.user,
                token: action.payload.token,
                cargaSpinner: false,
                cargando: false,
                autenticado: true,
                tarjeta: action.payload.tarjeta
            }
        case CAMBIAR_CONTRASEÑA_EXITO:
            return{
                ...state,
                usuario: action.payload.data.user,
                token: action.payload.token,
                cargando: false
            }
        case RECORDAR_USUARIO_FALLO:
            return{
                ...state,
                cargando: false,
                cargaSpinner: false
            }
        case SALIR_CUENTA:
            return{
                ...state,
                usuario: null,
                token: null,
                autenticado: false,
                cargando: false
            }
        case CAMBIAR_DATOS_PERSONALES_EXITO:
            return{
                ...state,
                usuario: action.payload.data.user,
                cargando: false
            }
        case AGREGAR_CARRITO:
            return{
                ...state,
                usuario: action.payload.data.productoCart
            }
        case CAMBIAR_ENVIO:
            return{
                ...state,
                usuario: action.payload.data.usuario
            }
        case CALCULAR_TOTAL:
            return{
                ...state,
                usuario: action.payload.data.usuarioTotal
            }
        default:
            return state;
    }
}