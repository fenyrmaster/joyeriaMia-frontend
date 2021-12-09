import clienteAxios from "../config/axios";
import { CARGANDO, CARGANDO_COMPLETO, OBTENER_PRODUCTO, EDITAR_PRODUCTO_CANCELAR, EDITAR_PRODUCTO_PREGUNTA, EDITAR_PRODUCTO_EDITAR, ELIMINAR_PRODUCTO_PREGUNTA, ELIMINAR_PRODUCTO_CANCELAR, ELIMINAR_PRODUCTO_BORRAR ,OBTENER_PRODUCTOS_ADMIN, AGREGAR_PROMOCION_PREGUNTA, AGREGAR_PROMOCION_CANCELAR, AGREGAR_PROMOCION_AGREGAR, OBTENER_PRODUCTOS } from "../types/typesProductos";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export function crearProducto(datos, formDatos, guardarFormDatos, guardarCargando) {
    return async(dispatch) => {
        try{
            guardarCargando(true);
            let token = Cookies.get("jwt2")
            await clienteAxios.post(`/api/productos?jwt=${token}`, datos);
            Swal.fire(
                'Creado!',
                'Producto creado',
                'success'
            );
            guardarFormDatos({ ...datos,         
                nombre: "",
                codigo: "",
                precio: 0,
                peso: 0,
                tipo: formDatos.tipo,
                subcategoria: formDatos.subcategoria,
                imagenPortada: null,
                imagenes: []
            });
            guardarCargando(false);
        }catch(error){
            guardarCargando(false);
            console.log(error.response);
        }
    }
}
export function obtenerProductosAdmin(pagina, filtro) {
    return async(dispatch) => {
        dispatch(spinnerPoner());
        try{
            if(filtro.tipo === "Catalogo"){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}`);
                dispatch(productosTodosAdmin(productos.data));
            } else if(filtro.subcategoria === "" && filtro.tipo !== "Catalogo"){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}`);
                dispatch(productosTodosAdmin(productos.data));
            } else if(filtro.subcategoria !== "" || filtro.subcategoria){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}&subcategoria=${filtro.subcategoria}`);
                dispatch(productosTodosAdmin(productos.data));
            }
        }catch(error){
            dispatch(spinnerQuitar());
            console.log(error.response);
        }
    }
}
export function obtenerProductos(pagina, filtro) {
    return async(dispatch) => {
        dispatch(spinnerPoner());
        try{
            if(filtro.tipo === "Catalogo"){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=8&sort=precio&tipo=${filtro.tipo}&stock=true`);
                dispatch(productosTodos(productos.data));
            } else if(filtro.subcategoria === "" && filtro.tipo !== "Catalogo"){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=8&sort=precio&tipo=${filtro.tipo}&stock=true`);
                dispatch(productosTodos(productos.data));
            } else if(filtro.subcategoria !== "" || filtro.subcategoria){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=8&sort=precio&tipo=${filtro.tipo}&stock=true&subcategoria=${filtro.subcategoria}`);
                dispatch(productosTodos(productos.data));
            }
        }catch(error){
            dispatch(spinnerQuitar());
            console.log(error.response);
        }
    }
}
export function obtenerProductosPopular(vendidos) {
    return async(dispatch) => {
        dispatch(spinnerPoner());
        try{
            if(vendidos){
                const productos = await clienteAxios.get(`/api/productos?limit=6&sort=-vendidos&stock=true`);
                dispatch(productosTodos(productos.data));
            } else{
                const productos = await clienteAxios.get(`/api/productos/popular/promocion`);
                dispatch(productosTodos(productos.data));
            }
        }catch(error){
            dispatch(spinnerQuitar());
            console.log(error.response);
        }
    }
}
export function obtenerProducto(codigo){
    return async(dispatch) => {
        dispatch(spinnerPoner());
        try{
            const producto = await clienteAxios.get(`/api/productos/producto/${codigo}`);
            dispatch(productoBusqueda(producto.data));
        } catch(error){
            dispatch(spinnerQuitar());
            console.log(error.response);
        }
    }
}
export function obtenerProductosCodigo(codigo) {
    return async(dispatch) => {
        try{
            const productos = await clienteAxios.get(`/api/productos?codigo=${codigo}`);
            dispatch(productosTodosAdmin(productos.data));
        }catch(error){
            console.log(error.response);
        }
    }
}
export function ponerProductoPromocion(data) {
    return async(dispatch) => {
        dispatch(productoPromocionPregunta(data));
    }
}
export function cancelarPromocionForm() {
    return async(dispatch) => {
        dispatch(productoPromocionCancelar());
    }
}
export function agregarPromocionAPI(datos, id, guardarFormPromocion, guardarcargandoPromo) {
    return async(dispatch) => {
        try{
            guardarcargandoPromo(true);
            let token = Cookies.get("jwt2")
            const producto = await clienteAxios.patch(`/api/productos/promocion/${id}?jwt=${token}`, datos);
            dispatch(productoPromocion(producto.data.data.doc));
            guardarFormPromocion(false);
            Swal.fire(
                'Agregado!',
                'Promocion Actualizada',
                'success'
            )
            guardarcargandoPromo(false);
        }catch(error){
            guardarcargandoPromo(false);
            console.log(error.response);
        }
    }
}
export function eliminarProducto(datos, pagina, filtro) {
    return async(dispatch) => {
        try{
            let token = Cookies.get("jwt2")
            await clienteAxios.delete(`/api/productos/${datos._id}?jwt=${token}`);
            dispatch(eliminarProductoRe(datos));
            if(filtro.tipo === "Catalogo"){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}`);
                dispatch(productosTodosAdmin(productos.data));
            } else if(filtro.subcategoria === "" && filtro.tipo !== "Catalogo"){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}`);
                dispatch(productosTodosAdmin(productos.data));
            } else if(filtro.subcategoria !== "" || filtro.subcategoria){
                const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}&subcategoria=${filtro.subcategoria}`);
                dispatch(productosTodosAdmin(productos.data));
            }
            Swal.fire(
                'Eliminado!',
                'Producto eliminado con exito',
                'success'
            )
        } catch(error){
            console.log(error.response);
        }
    }
}
export function editarProductoAPI(datos, id, pagina, filtro, guardarFormDatos, formDatos, guardarFormEditar, guardarcargandoEdicion) {
    return async(dispatch) => {
        try{
            guardarcargandoEdicion(true);
            let token = Cookies.get("jwt2")
            const producto = await clienteAxios.patch(`/api/productos/${id}?jwt=${token}`, datos);
            dispatch(editarProductosRE(producto.data.data.doc));
            if(datos.subcategoria !== ""){
                if(filtro.tipo === "Catalogo"){
                    const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}`);
                    dispatch(productosTodosAdmin(productos.data));
                } else if(filtro.subcategoria === "" && filtro.tipo !== "Catalogo"){
                    const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}`);
                    dispatch(productosTodosAdmin(productos.data));
                } else if(filtro.subcategoria !== "" || filtro.subcategoria){
                    const productos = await clienteAxios.get(`/api/productos?page=${pagina}&limit=6&sort=precio&tipo=${filtro.tipo}&subcategoria=${filtro.subcategoria}`);
                    dispatch(productosTodosAdmin(productos.data));
                }
            }
            Swal.fire(
                'Editado!',
                'Producto editado con exito',
                'success'
            );
            guardarFormDatos({
                ...formDatos,
                nombre: "",
                codigo: "",
                precio: 0,
                peso: 0,
                imagenPortada: null,
                imagenes: []
            })
            guardarFormEditar(false);
            guardarcargandoEdicion(false);
        } catch(error){
            guardarcargandoEdicion(false);
            console.log(error.response);
        }
    }
}
export function cancelarProductoEliminar() {
    return async(dispatch) => {
        dispatch(cancelarEliminarRe());
    }
}
export function ponerProductosEliminar(datos) {
    return async(dispatch) => {
        dispatch(ponerProductoEliminar(datos));
    }
}
export function ponerProductosEditar(datos) {
    return async(dispatch) => {
        dispatch(ponerProductoEditarRE(datos));
    }
}
export function cancelarProductoEditar() {
    return async(dispatch) => {
        dispatch(cancelarEdicionP());
    }
}

const spinnerPoner = () => ({
    type: CARGANDO
});
const spinnerQuitar = () => ({
    type: CARGANDO_COMPLETO
});
const productosTodosAdmin = datos => ({
    type: OBTENER_PRODUCTOS_ADMIN,
    payload: datos
});
const productosTodos = datos => ({
    type: OBTENER_PRODUCTOS,
    payload: datos
});
const productoBusqueda = datos => ({
    type: OBTENER_PRODUCTO,
    payload: datos
});
const cancelarEdicionP = () => ({
    type: EDITAR_PRODUCTO_CANCELAR
})
const ponerProductoEliminar = datos => ({
    type: ELIMINAR_PRODUCTO_PREGUNTA,
    payload: datos
})
const ponerProductoEditarRE = datos => ({
    type: EDITAR_PRODUCTO_PREGUNTA,
    payload: datos
})
const editarProductosRE = datos => ({
    type: EDITAR_PRODUCTO_EDITAR,
    payload: datos
})
const cancelarEliminarRe = () => ({
    type: ELIMINAR_PRODUCTO_CANCELAR
})
const eliminarProductoRe = datos => ({
    type: ELIMINAR_PRODUCTO_BORRAR,
    payload: datos
})
const productoPromocionPregunta = datos => ({
    type: AGREGAR_PROMOCION_PREGUNTA,
    payload: datos
})
const productoPromocionCancelar = () => ({
    type: AGREGAR_PROMOCION_CANCELAR
})
const productoPromocion = datos => ({
    type: AGREGAR_PROMOCION_AGREGAR,
    payload: datos
});