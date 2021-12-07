import { QUITAR_SPINNER, CARGAR_SPINNER, CALCULAR_TOTAL, AGREGAR_CARRITO, CREAR_USUARIO_EXITO, CREAR_USUARIO_FALLO, CAMBIAR_CONTRASEÑA_EXITO, CAMBIAR_CONTRASEÑA_FALLO, CAMBIAR_DATOS_PERSONALES_EXITO, CAMBIAR_DATOS_PERSONALES_FALLO, LOGIN_EXITO, LOGIN_FALLO, COMENZAR_BUSQUEDA, RECORDAR_USUARIO_EXITO, RECORDAR_USUARIO_FALLO, SALIR_CUENTA, CAMBIAR_ENVIO } from "../types/typesUsuario";
import clienteAxios from '../config/axios';
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";

export function crearNuevoUsuario(datos, history) {
    return async(dispatch) => {
        dispatch(busquedaActiva());
        dispatch(cargarSpinner());
        try{
            const usuario = await clienteAxios.post("/api/usuarios/signup", datos);
            dispatch(usuarioExito(usuario.data));
            history.push("/tienda");
            Swal.fire(
                'Registro completado!',
                'Enviamos un correo de confirmacion, no olvides checar tu spam si no ves nuestro correo, si estas en un dispositivo Apple, es posible que no funcione, en tal caso, accede desde un dispositivo android o windows',
                'success'
            )
        }catch(error){
            dispatch(quitarSpinner());
            Swal.fire(
                'Error!',
                error.response.data.message,
                'error'
            )
            console.log(error.response);
        }
    }
}

export function accederLogin(datos, history) {
    return async(dispatch) => {
        dispatch(busquedaActiva());
        dispatch(cargarSpinner());
        try{
            const usuario = await clienteAxios.post("/api/usuarios/login", datos);
            dispatch(loginExito(usuario.data));
            history.push("/tienda");
            Swal.fire(
                'Accedido!',
                'Has accedido a tu cuenta, si estas en un dispositivo Apple, es posible que no funcione, en tal caso, accede desde un dispositivo android o windows',
                'success'
              )
        }catch(error){
            dispatch(quitarSpinner());
            Swal.fire(
                'Error!',
                error.response.data.message,
                'error'
            )
        }
    }
}

export function cuentaOlvidada(datos, history) {
    return async(dispatch) => {
        try{
            await clienteAxios.post("/api/usuarios/forgotPassword", datos);
            history.push("/");
            Swal.fire(
                'Encontrado!',
                'Hemos enviado un correo con mas instrucciones, no olvides checar tu spam si no ves nuestro correo',
                'success'
              )
        }catch(error){
            Swal.fire(
                'Error!',
                error.response.data.message,
                'error'
            )
        }
    }
}
export function recuperarContraseña(datos, history, id) {
    return async(dispatch) => {
        try{
            await clienteAxios.patch(`/api/usuarios/resetPassword/${id}`, datos);
            history.push("/");
            Swal.fire(
                'Restablecido!',
                'Tu contraseña ha sido restablecida con exito',
                'success'
              )
        }catch(error){
            Swal.fire(
                'Error!',
                error.response.data.message,
                'error'
            )
        }
    }
}

export function recordarUsuario(){
    return async(dispatch) => {
        dispatch(busquedaActiva());
        try{
            const resultado = await clienteAxios("/api/usuarios/remind");
            dispatch(recordarUsuarioExito(resultado.data));
        } catch(error){
            console.log(error.response);
            dispatch(recordarUsuarioFracaso());
        }
    }
}

export function salirCuenta(history){
    return async(dispatch) => {
        await clienteAxios("/api/usuarios/logout");
        dispatch(salirCuentaToken());
        history.push("/tienda");
        Swal.fire(
            'Sesion cerrada!',
            'Ha salido de su cuenta',
            'success'
        )
    }
}

export function cambiarDatosPersonal(datos){
    return async(dispatch) => {
        dispatch(busquedaActiva());
        try{
            const usuario = await clienteAxios.patch("/api/usuarios/updateData", datos);
            dispatch(datosPersonalesExito(usuario.data));
            Swal.fire(
                'Datos cambiados!',
                'Hemos actualizado sus datos',
                'success'
            )
        }catch(error){
            console.log(error.response);
            Swal.fire(
                'Error!',
                error.response.data.message,
                'error'
            )
        }
    }
}
export function cambiarContraseña(datos, guardarDatosContraseña){
    return async(dispatch) => {
        dispatch(busquedaActiva());
        try{
            const usuario = await clienteAxios.patch("/api/usuarios/updatePassword/me", datos);
            dispatch(datosContraseñaExito(usuario.data));
            Swal.fire(
                'Datos cambiados!',
                'Hemos actualizado la contraseña',
                'success'
            );
            guardarDatosContraseña({
                ...datos,
                password: "",
                newPassword: "",
                newPasswordConfirm: ""
            })
        }catch(error){
            Swal.fire(
                'Error!',
                error.response.data.message,
                'error'
            )
        }
    }
}
export function agregarCarro(productoId, auth){
    return async(dispatch) => {
        if(auth){
            try{
                const usuario = await clienteAxios.post("/api/usuarios/carritoAgregar", {productoId: productoId});
                dispatch(actualizarUsuario(usuario.data));
                Swal.fire(
                    "Correcto",
                    "Producto agregado con exito",
                    "success"
                )
            } catch(error){
                Swal.fire(
                    'Error!',
                    error.response.data.message,
                    'error'
                )
            }
        } else{
            Swal.fire(
                "Error!",
                "Debes de iniciar sesion para agregar productos al carrito",
                "error"
            )
        }
    }
}
export function eliminarCarro(id){
    return async(dispatch) => {
        try{
            const usuario = await clienteAxios.patch("/api/usuarios/carritoEliminar", {id: id});
            dispatch(actualizarUsuario(usuario.data));
            Swal.fire(
                "Correcto",
                "Producto eliminado del carrito con exito",
                "success"
            )
            const usuarioTotal = await clienteAxios.get("/api/usuarios/obtenerTotal");
            dispatch(calcularTodo(usuarioTotal.data));
        } catch(error){
            console.log(error.response);
            //Swal.fire(
            //    'Error!',
            //    error.response.data.message,
            //    'error'
            //)
        }
    }
}
export function cambiarEnvioAPI(envio){
    return async(dispatch) => {
        try{
            const usuario = await clienteAxios.patch("/api/usuarios/envioCambiar", {envio: envio});
            dispatch(cambiarEnvioOp(usuario.data));
        } catch(error){
            console.log(error.response);
        }
    }
}
export function cambiarMetodoAPI(metodoPago){
    return async(dispatch) => {
        try{
            const usuario = await clienteAxios.patch("/api/usuarios/metodoCambiar", {metodoPago: metodoPago});
            dispatch(cambiarEnvioOp(usuario.data));
        } catch(error){
            console.log(error.response);
        }
    }
}
export function confirmarUsuario(token, history){
    return async(dispatch) => {
        try{
            await clienteAxios.get(`/api/usuarios/confirm/${token}`);
            history.push("/");
            Swal.fire(
                "Correcto",
                "Cuenta confirmada con exito",
                "success"
            )
        } catch(error){
            Swal.fire(
                "Error",
                "Algo salio mal, intentalo mas tarde",
                "error"
            )
        }
    }
}
export function cambiarMedidasAPI(medida, id){
    return async(dispatch) => {
        try{
            const usuario = await clienteAxios.patch("/api/usuarios/medidasCambiar", {medida: medida, id: id});
            dispatch(cambiarEnvioOp(usuario.data));
        } catch(error){
            console.log(error.response);
        }
    }
}
export function cambiarCantidadAPI(cantidad, id){
    return async(dispatch) => {
        try{
            const usuario = await clienteAxios.patch("/api/usuarios/cantidadCambiar", {cantidad: cantidad, id: id});
            dispatch(cambiarEnvioOp(usuario.data));
            const usuarioTotal = await clienteAxios.get("/api/usuarios/obtenerTotal");
            dispatch(calcularTodo(usuarioTotal.data));
        } catch(error){
            console.log(error.response);
        }
    }
}
export function calcularTotalAPI(){
    return async(dispatch) => {
        try{
            const usuario = await clienteAxios.get("/api/usuarios/obtenerTotal");
            dispatch(calcularTodo(usuario.data));
        } catch(error){
            console.log(error.response);
        }
    }
}
//export function pagoTarjeta(id){
//    return async(dispatch) => {
//        const stripePromise = loadStripe("pk_test_51Ju0AZGKijwK1vhe1EnQb3RRxVzHVZtEoN4z6chKk04xl983U6pJ44nJUS7oasLqM9VCY5W3uo9PBYfsAUbTS9Tt00EoywAYXz");
//        const stripe = await stripePromise;
//        try{
//            const session = await clienteAxios.get(`/api/usuarios/checkout-session/${id}`);
//            await stripe.redirectToCheckout({
//                sessionId: session.data.session.id
//            })
//        } catch(err) {
//            console.log(err)
//        }
//    }
//}

const busquedaActiva = () => ({
    type: COMENZAR_BUSQUEDA,
});
const cargarSpinner = () => ({
    type: CARGAR_SPINNER
});
const quitarSpinner = () => ({
    type: QUITAR_SPINNER
});
const calcularTodo = usuario => ({
    type: CALCULAR_TOTAL,
    payload: usuario
})
const usuarioExito = (datos) => ({
    type: CREAR_USUARIO_EXITO,
    payload: datos
});
const loginExito = (datos) => ({
    type: LOGIN_EXITO,
    payload: datos
});
const actualizarUsuario = usuario => ({
    type: AGREGAR_CARRITO,
    payload: usuario
})
const cambiarEnvioOp = usuario => ({
    type: CAMBIAR_ENVIO,
    payload: usuario
})
const recordarUsuarioExito = (datos) => ({
    type: RECORDAR_USUARIO_EXITO,
    payload: datos
});
const recordarUsuarioFracaso = () => ({
    type: RECORDAR_USUARIO_FALLO
})
const salirCuentaToken = () => ({
    type: SALIR_CUENTA
})
const datosPersonalesExito = (datos) => ({
    type: CAMBIAR_DATOS_PERSONALES_EXITO,
    payload: datos
})
const datosContraseñaExito = (datos) => ({
    type: CAMBIAR_CONTRASEÑA_EXITO,
    payload: datos
})