import clienteAxios from "../config/axios";
import { CREAR_SUB_EXITO, CREAR_SUB_FALLO, ELIMINAR_SUB_CANCELAR, ELIMINAR_SUB_PREGUNTA, ELIMINAR_SUB_BORRAR, EDITAR_SUB_PREGUNTA, EDITAR_SUB_CANCELAR, EDITAR_SUB_EDITAR, OBTENER_SUB_ADMIN, OBTENER_SUB } from "../types/typesSub";
import Swal from "sweetalert2";

export function crearSub(datos, guardarFormCrear, guardarSubCrear) {
    return async(dispatch) => {
        try{
            const subcategoria = await clienteAxios.post("/api/subcategorias", datos);
            dispatch(subCrear(subcategoria.data.data.newSubcategoria));
            guardarFormCrear(false);
            guardarSubCrear({...datos, nombre: "", centimetros: "", medidas: ""})
            Swal.fire(
                'Creado!',
                'Subcategoria creada',
                'success'
            )
        }catch(error){
            console.log(error.response);
        }
    }
}
export function editarSub(datos, id, guardarFormEditar, guardarSubEditar) {
    return async(dispatch) => {
        try{
            const subcategoria = await clienteAxios.patch(`/api/subcategorias/${id}`, datos);
            dispatch(subEditar(subcategoria.data.data.doc));
            guardarFormEditar(false);
            guardarSubEditar({...datos, nombre: "", centimetros: "", medidas: ""});
            Swal.fire(
                'Editado!',
                'Subcategoria editada',
                'success'
            )
        }catch(error){
            console.log(error.response);
        }
    }
}

export function obtenerSubAdmin() {
    return async(dispatch) => {
        try{
            const subcategorias = await clienteAxios.get("/api/subcategorias");
            dispatch(subTodosAdmin(subcategorias.data));
        }catch(error){
            console.log(error.response);
        }
    }
}
export function obtenerSub() {
    return async(dispatch) => {
        try{
            const subcategorias = await clienteAxios.get("/api/subcategorias");
            dispatch(subTodos(subcategorias.data));
        }catch(error){
            console.log(error.response);
        }
    }
}
export function ponerSubEliminar(data) {
    return async(dispatch) => {
        dispatch(eliminarPregunta(data));
    }
}
export function ponerSubEditar(data) {
    return async(dispatch) => {
        dispatch(subEditarPregunta(data));
    }
}
export function cancelarEliminado() {
    return async(dispatch) => {
        dispatch(cancelarEliminar());
    }
}
export function cancelarEditado() {
    return async(dispatch) => {
        dispatch(cancelarEdicion());
    }
}
export function eliminarSub(datos) {
    return async(dispatch) => {
        try{
            await clienteAxios.delete(`/api/subcategorias/${datos._id}`);
            dispatch(subBorrar(datos));
            Swal.fire(
                'Eliminado!',
                'Subcategoria eliminada con exito',
                'success'
            )
        } catch(error){
            console.log(error.response);
        }
    }
}

const subTodosAdmin = data => ({
    type: OBTENER_SUB_ADMIN,
    payload: data
});
const subTodos = data => ({
    type: OBTENER_SUB,
    payload: data
})
const subEditarPregunta = data => ({
    type: EDITAR_SUB_PREGUNTA,
    payload: data
});
const subCrear = data => ({
    type: CREAR_SUB_EXITO,
    payload: data
})
const eliminarPregunta = data => ({
    type: ELIMINAR_SUB_PREGUNTA,
    payload: data
});
const cancelarEliminar = () => ({
    type: ELIMINAR_SUB_CANCELAR
});
const cancelarEdicion = () => ({
    type: EDITAR_SUB_CANCELAR
})
const subBorrar = datos => ({
    type: ELIMINAR_SUB_BORRAR,
    payload: datos
})
const subEditar = datos => ({
    type: EDITAR_SUB_EDITAR,
    payload: datos
})