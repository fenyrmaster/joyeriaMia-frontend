import React, { useEffect, useState } from 'react';
import NavegacionApp from './NavegacionApp';
import ProductoAdmin from './ProductoAdmin';
import { useDispatch, useSelector } from "react-redux";
import { eliminarProducto, editarProductoAPI, cancelarProductoEditar, cancelarProductoEliminar, obtenerProductosAdmin, obtenerProductosCodigo, cancelarPromocionForm, agregarPromocionAPI } from '../actions/productosAction';
import { obtenerSub } from '../actions/subAction';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction';
import Swal from 'sweetalert2';
import Spinner from './Spinner';

const AdminProductos = () => {

    const dispatch = useDispatch();
    const productosAdmin = useSelector(state => state.Producto.productosAdmin);
    const subcategorias = useSelector(state => state.Subcategoria.subcategorias);
    const productoPromocion = useSelector(state => state.Producto.productoPromocion);
    const productoEditar = useSelector(state => state.Producto.productoEditar);
    const alerta = useSelector(state => state.Alerta);
    const productoBorrar = useSelector(state => state.Producto.productoBorrar);
    const cargando = useSelector(state => state.Producto.cargando);

    const [ pagina, guardarPagina ] = useState(1);
    const [ cargandoEdicion, guardarcargandoEdicion ] = useState(false);
    const [ cargandoPromo, guardarcargandoPromo ] = useState(false);
    const [ filtros, guardarFiltros ] = useState({
        tipo: "Oro",
        subcategoria: ""
    });
    const [ formDatos, guardarFormDatos ] = useState({
        nombre: "",
        tipo: "Oro",
        stock: true,
        codigo: "",
        precio: 0,
        peso: 0,
        subcategoria: "",
        imagenPortada: null,
        imagenes: []
    });
    const [ promocion, guardarPromocion ] = useState({
        promocionPorcentaje: 0,
        promocionFecha: ""
    });
    const [ formPromocion, guardarFormPromocion ] = useState(false);
    const [ formEditar, guardarFormEditar ] = useState(false);
    const [ codigo, guardarCodigo ] = useState("");

    useEffect(() => {
        dispatch(obtenerProductosAdmin(pagina, filtros));
        let codigo = document.querySelector(".codigo-form");
        codigo.scrollIntoView();
    }, [pagina, filtros]);
    useEffect(() => {
        dispatch(obtenerSub());
    }, []);
    useEffect(() => {
        if(Object.keys(productoPromocion).length !== 0){
            guardarFormPromocion(true);
        }
    }, [productoPromocion]);
    useEffect(() => {
        if(alerta.mensaje){
            Swal.fire({
                title: 'Alerta',
                text: alerta.mensaje,
                icon: alerta.clases,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(ocultarAlerta());
                }
              })
        }
    }, [alerta]);
    useEffect(() => {
        if(Object.keys(productoBorrar).length !== 0){
            Swal.fire({
                title: `Seguro que quieres borrar ${productoBorrar.nombre}`,
                text: "No podras revertir esta accion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(eliminarProducto(productoBorrar, pagina, filtros));
                } else if(result.isDismissed){
                    dispatch(cancelarProductoEliminar());
                }
              })
        }
    }, [productoBorrar]);
    useEffect(() => {
        if(Object.keys(productoEditar).length !== 0){
            guardarFormEditar(true);
            guardarFormDatos({
                ...formDatos,
                nombre: productoEditar.nombre,
                codigo: productoEditar.codigo,
                precio: productoEditar.precio,
                peso: productoEditar.peso,
                tipo: productoEditar.tipo
            })
        }
    }, [productoEditar]);

    const paginaAnterior = () => {
        const nuevaPagina = pagina - 1;
        if(nuevaPagina === 0) return;
        guardarPagina(nuevaPagina);
    }
    const paginaSiguiente = () => {
        const nuevaPagina = pagina + 1;
        guardarPagina(nuevaPagina);
    }
    const obtenerSubcategoria = e => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]; 
        guardarFiltros({...filtros, subcategoria: el.getAttribute("id")});
        guardarPagina(1);
    }
    const obtenerSubcategoriaForm = e => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]; 
        guardarFormDatos({...formDatos, subcategoria: el.getAttribute("id")});
    }
    const obtenerTipo = e => {
        guardarFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
        guardarPagina(1);
    }
    const buscarCodigo = e => {
        e.preventDefault();
        dispatch(obtenerProductosCodigo(codigo));
    }
    const cancelarPromocion = () => {
        dispatch(cancelarPromocionForm());
        guardarFormPromocion(false);
    }
    const cancelarProductoEd = () => {
        dispatch(cancelarProductoEditar());
        guardarFormEditar(false);
        guardarFormDatos({
            ...formDatos,
            nombre: "",
            tipo: "",
            codigo: "",
            precio: 0,
            peso: 0,
            imagenPortada: null,
            imagenes: []
        })
    }
    const agregarPromocion = e => {
        e.preventDefault();
        if(promocion.promocionPorcentaje <= 0){
            const alerta = {
                clases: "warning",
                mensaje: "El porcentaje debe de ser entre 0 a 99"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        } else if(promocion.promocionPorcentaje >= 100){
            const alerta = {
                clases: "warning",
                mensaje: "El porcentaje debe de ser entre 0 a 99"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        dispatch(agregarPromocionAPI(promocion, productoPromocion._id, guardarFormPromocion, guardarcargandoPromo));
    }
    const editarProducto = e => {
        e.preventDefault();
        let form = new FormData();
        form.append("nombre", formDatos.nombre);
        form.append("codigo", formDatos.codigo);
        form.append("precio", formDatos.precio);
        form.append("peso", formDatos.peso);
        form.append("tipo", formDatos.tipo);
        form.append("stock", formDatos.stock);
        if(formDatos.subcategoria !== ""){
            form.append("subcategoria", formDatos.subcategoria);
        }
        if(formDatos.imagenPortada){
            form.append("imagenPortada", formDatos.imagenPortada);
        }
        if(formDatos.imagenes.length !== 0){
            let datos = formDatos.imagenes;
            Array.from(datos).map(el => form.append("imagenes", el));
        }
        dispatch(editarProductoAPI(form, productoEditar._id, pagina, filtros, guardarFormDatos, formDatos, guardarFormEditar, guardarcargandoEdicion));
    }
    const subirImagenes = e => {
        guardarFormDatos({...formDatos, imagenes: e.target.files});
    }
    const obtenerFoto = e => {
        guardarFormDatos({...formDatos, imagenPortada: e.target.files[0]});
    }
    const cambiarStock = e => {
        if(e.target.value === "Si"){
            guardarFormDatos({
                ...formDatos,
                stock: true
            })
        } else if(e.target.value === "No"){
            guardarFormDatos({
                ...formDatos,
                stock: false
            })
        }
    }

    return(
        <div className="app-contenedor">
            <div className={ (formPromocion || formEditar) ? "popup" : "popup hiddenFill"}></div>
            <form onSubmit={e => agregarPromocion(e)} className={ formPromocion ? "formar form" : "formar form hiddenForm"}>
                <div className="input-app">
                    <label htmlFor="nombre">Porcentaje de la promocion:</label>
                    <input required onChange={e => guardarPromocion({...promocion, [e.target.name]: parseInt(e.target.value)})} name="promocionPorcentaje" className="input-app-campo" type="number" id="nombre"/>
                </div>
                <div className="input-app">
                    <label htmlFor="nombre">Fecha cuando acabara:</label>
                    <input required onChange={e => guardarPromocion({...promocion, [e.target.name]: e.target.value})} name="promocionFecha" className="input-app-campo" type="date" id="nombre"/>
                </div>
                <div className="acciones">
                    { cargandoPromo ? <button disabled className="btn btn-pink" type="submit"><span className="btn-texto">Creando Promocion...</span></button> : <button className="btn btn-pink" type="submit"><span className="btn-texto">Crear Promocion</span></button> }
                    <button onClick={() => cancelarPromocion()} className="btn btn-orange" type="button"><span className="btn-texto">Cancelar</span></button>
                </div>
            </form>
            <form onSubmit={e => editarProducto(e)} className={ formEditar ? "formar form" : "formar form hiddenForm"}>
                <div className="input-app">
                    <label htmlFor="nombre">Nombre del producto:</label>
                    <input name="nombre" value={formDatos.nombre} onChange={(e) => guardarFormDatos({...formDatos, [e.target.name]: e.target.value})} required className="input-app-campo" type="text" id="nombre"/>
                </div>
                <div className="input-app">
                    <label htmlFor="tipo">Tipo de producto:</label>
                    <select name="tipo" value={formDatos.tipo} onChange={(e) => guardarFormDatos({...formDatos, [e.target.name]: e.target.value})} id="tipo" required className="input-app-campo">
                        <option value="Oro">Oro</option>
                        <option value="Plata">Plata</option>
                        <option value="Catalogo">Catalogo</option>
                    </select>
                </div>
                <div className="input-app">
                    <label htmlFor="tipo">Stock?:</label>
                    <select name="tipo" onChange={(e) => cambiarStock(e)} id="tipo" required className="input-app-campo">
                        <option>Si</option>
                        <option>No</option>
                    </select>
                </div>
                <div className="input-app">
                    <label htmlFor="precio">Precio del producto:</label>
                    <input name="precio" value={formDatos.precio} onChange={(e) => guardarFormDatos({...formDatos, [e.target.name]: parseFloat(e.target.value)})} required className="input-app-campo" type="number" id="precio"/>
                </div>
                <div className="input-app">
                    <label htmlFor="codigo">Codigo del producto:</label>
                    <input name="codigo" value={formDatos.codigo} onChange={(e) => guardarFormDatos({...formDatos, [e.target.name]: e.target.value})} required className="input-app-campo" type="text" id="codigo"/>
                </div>
                <div className="input-app">
                    <label htmlFor="peso">Peso del producto (en gramos):</label>
                    <input name="peso" value={formDatos.peso} onChange={(e) => guardarFormDatos({...formDatos, [e.target.name]: parseFloat(e.target.value)})} required className="input-app-campo" type="number" id="peso"/>
                </div>
                <div className="input-app">
                    <label htmlFor="subcategoria">Subcategoria:</label>
                    <select onChange={e => obtenerSubcategoriaForm(e)} defaultValue={"Ninguno"} id="subcategoria" required className="input-app-campo">
                        <option id="">No cambiar</option>
                        { subcategorias.map(el => <option key={el._id} id={el._id}>{el.nombre}</option>) }
                    </select>
                </div>
                <div className="input-app">
                    <label htmlFor="imagenPortada">Imagen de portada:</label>
                    <input onChange={e => obtenerFoto(e)} className="input-app-campo custom-file-input" type="file" id="imagenPortada"/>
                </div>
                <div className="input-app">
                    <label htmlFor="imagenesAparte">Imagenes (Aparte de portada):</label>
                    <input onChange={e => subirImagenes(e)} multiple className="input-app-campo custom-file-input" type="file" id="imagenesAparte"/>
                </div>
                <div className="acciones">
                    { cargandoEdicion ? <button disabled className="btn btn-pink" type="submit"><span className="btn-texto">Editando...</span></button> : <button className="btn btn-pink" type="submit"><span className="btn-texto">Editar Producto</span></button> }
                    <button onClick={() => cancelarProductoEd()} className="btn btn-orange" type="button"><span className="btn-texto">Cancelar</span></button>
                </div>
            </form>
            <NavegacionApp/>
            <div className="contenido">
                <div className="filtros-admin">
                    <h3 className="h3-pedido">Filtros</h3>
                    <form className="form-agregar cortar">
                        <div className="input-app">
                            <label htmlFor="material">Material:</label>
                            <select name="tipo" onChange={e => obtenerTipo(e)} className="input-app-campo" id="material">
                                <option defaultValue>Oro</option>
                                <option>Plata</option>
                                <option>Catalogo</option>
                            </select>
                        </div>
                        <div className="input-app">
                            <label htmlFor="subcategoria">Subcategoria:</label>
                            <select  onChange={e => obtenerSubcategoria(e)} className="input-app-campo" id="subcategoria">
                                <option id="">Todos</option>
                                { subcategorias.map(el => <option key={el._id} id={el._id}>{el.nombre}</option>) }
                            </select>
                        </div>
                    </form>
                    <form onSubmit={e => buscarCodigo(e)} className="form-agregar codigo-form">
                        <div className="input-app">
                            <label htmlFor="codigo">Codigo:</label>
                            <input onChange={e => guardarCodigo(e.target.value)} className="input-app-campo" required type="text" id="codigo"/>
                        </div>
                        <button className="btn btn-orange"><span className="btn-texto">Buscar</span></button>
                    </form>
                </div>
                { cargando ? <Spinner/> :
                <div className="productosadmin-contenedor">
                  { (productosAdmin.length !== 0) ? productosAdmin.map(el => <ProductoAdmin producto={el} key={el._id}/>) : <p className="producto-no">No hay Productos</p> }
                </div> }
                <div className="paginas paginas-admin">
                    { pagina === 1 
                    ? null
                    : <button onClick={() => paginaAnterior()} className="botones-paginas">
                        <ion-icon name="arrow-back"></ion-icon>
                        <p>Pagina Anterior</p>
                      </button>
                    }
                    { productosAdmin.length < 6
                    ? null
                    : <button onClick={() => paginaSiguiente()} className="botones-paginas">
                        <p>Siguiente Pagina</p>
                        <ion-icon name="arrow-forward"></ion-icon>
                      </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminProductos;