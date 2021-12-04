import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from "../types/typesAlertas";

export function mostrarAlerta(alerta){
    return (dispatch) => {
        dispatch(mostrarAlertaError(alerta));
    }
}
export function ocultarAlerta(){
    return(dispatch) => {
        dispatch(ocultarAlertaAction());
    }
}

const mostrarAlertaError = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})
const ocultarAlertaAction = () => ({
    type: OCULTAR_ALERTA
})