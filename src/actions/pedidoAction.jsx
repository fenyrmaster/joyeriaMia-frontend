import { CARGAR_SPINNER, QUITAR_SPINNER, OBTENER_PEDIDOS, OBTENER_PEDIDOS_ADMIN } from "../types/typesPedidos";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import clienteAxios from "../config/axios";

export function crearPedido(id, history) {
    return async(dispatch) => {
        try{
            let token = Cookies.get("jwt2")
            await clienteAxios.post(`/api/pedidos/${id}?jwt=${token}`);
            Swal.fire(
                'Pedido Realizado!',
                'Enviamos un correo con mas instrucciones, tambien puedes ver tu pedido en la seccion de pedidos, no olvides checar tu spam si no ves nuestro correo',
                'success'
            )
            history.push("/app/pedidos");
        }catch(error){
            console.log(error.response);
        }
    }
}

export function eliminarPedido(codigo, guardarPagina){
    return async(dispatch) => {
        try{
            let token = Cookies.get("jwt2")
            await clienteAxios.delete(`/api/pedidos/eliminarPedido/${codigo}?jwt=${token}`);
            Swal.fire(
                'Pedido Eliminado!',
                'Se ha eliminado el pedido',
                'success'
            )
            guardarPagina(1);
            const pedidos = await clienteAxios.get(`/api/pedidos?sort=-createdAt&limit=2&page=1&jwt=${token}`);
            dispatch(obtenerPedidoAdmin(pedidos.data));
        }catch(error){
            console.log(error.response);
        }
    }
}

export function obtenerPedidosAPI(id, pagina){
    return async(dispatch) => {
        dispatch(ponerSpinner());
        try{
            let token = Cookies.get("jwt2")
            const pedidos = await clienteAxios.get(`/api/pedidos?usuario=${id}&sort=-createdAt&limit=2&page=${pagina}&jwt=${token}`);
            dispatch(obtenerPedido2(pedidos.data));
        } catch(error){
            dispatch(quitarSpinner());
            console.log(error.response);
        }
    }
}
export function obtenerPedidosAdmin(pagina){
    return async(dispatch) => {
        dispatch(ponerSpinner());
        try{
            let token = Cookies.get("jwt2")
            const pedidos = await clienteAxios.get(`/api/pedidos?sort=-createdAt&limit=2&page=${pagina}&jwt=${token}`);
            dispatch(obtenerPedidoAdmin(pedidos.data));
        } catch(error){
            dispatch(quitarSpinner());
            console.log(error.response);
        }
    }
}
export function obtenerUnPedido(codigo, guardarPagina, guardarSolo){
    return async(dispatch) => {
        dispatch(ponerSpinner());
        if(codigo === ""){
            guardarSolo(false);
            guardarPagina(1);
            let token = Cookies.get("jwt2")
            const pedidos = await clienteAxios.get(`/api/pedidos?sort=-createdAt&limit=2&page=1&jwt=${token}`);
            dispatch(obtenerPedidoAdmin(pedidos.data));
        }else{
            try{
                let token = Cookies.get("jwt2")
                const pedidos = await clienteAxios.get(`/api/pedidos?codigo=${codigo}&jwt=${token}`);
                dispatch(obtenerPedidoAdmin(pedidos.data));
            } catch(error){
                dispatch(quitarSpinner());
                console.log(error.response);
            }
        }
    }
}
const obtenerPedido2 = data => ({
    type: OBTENER_PEDIDOS,
    payload: data
});
const obtenerPedidoAdmin = data => ({
    type: OBTENER_PEDIDOS_ADMIN,
    payload: data
})
const ponerSpinner = () => ({
    type: CARGAR_SPINNER
})
const quitarSpinner = () => ({
    type: QUITAR_SPINNER
})