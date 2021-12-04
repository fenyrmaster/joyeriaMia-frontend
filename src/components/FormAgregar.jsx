import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { obtenerSub } from '../actions/subAction';
import { crearProducto } from '../actions/productosAction';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction';
import Swal from 'sweetalert2';

const FormAgregar = () => {

    const dispatch = useDispatch();
    const alerta = useSelector(state => state.Alerta);
    const subcategorias = useSelector(state => state.Subcategoria.subcategorias);

    const [ formDatos, guardarFormDatos ] = useState({
        nombre: "",
        tipo: "Oro",
        codigo: "",
        precio: 0,
        peso: 0,
        subcategoria: "",
        imagenPortada: null,
        imagenes: []
    });
    const [ cargando, guardarCargando ] = useState(false);

    useEffect(() => {
        dispatch(obtenerSub());
    }, []);
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

    const obtenerSubcategoria = e => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]; 
        guardarFormDatos({...formDatos, subcategoria: el.getAttribute("id")});
    }
    const obtenerFoto = e => {
        guardarFormDatos({...formDatos, imagenPortada: e.target.files[0]});
    }
    const subirDatos = e => {
        e.preventDefault();
        if(!formDatos.imagenPortada){
            const alerta = {
                clases: "warning",
                mensaje: "Debes de agregar una imagen de portada"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        if(formDatos.subcategoria === ""){
            const alerta = {
                clases: "warning",
                mensaje: "Debes de agregar una subcategoria"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        if(formDatos.precio <= 0 || formDatos.peso <= 0){
            const alerta = {
                clases: "warning",
                mensaje: "El peso y precio deben de ser mayores a 0"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        let form = new FormData();
        form.append("nombre", formDatos.nombre);
        form.append("codigo", formDatos.codigo);
        form.append("precio", formDatos.precio);
        form.append("peso", formDatos.peso);
        form.append("tipo", formDatos.tipo);
        form.append("subcategoria", formDatos.subcategoria);
        form.append("imagenPortada", formDatos.imagenPortada);
        if(formDatos.imagenes.length !== 0){
            let datos = formDatos.imagenes;
            Array.from(datos).map(el => form.append("imagenes", el));
        }
        dispatch(crearProducto(form, formDatos, guardarFormDatos, guardarCargando));
    }
    const subirImagenes = e => {
        guardarFormDatos({...formDatos, imagenes: e.target.files});
    }

    return(
        <form onSubmit={e => subirDatos(e)} className="form-agregar">
            <div className="input-app">
                <label htmlFor="nombre">Nombre del producto:</label>
                <input name="nombre" value={formDatos.nombre} onChange={(e) => guardarFormDatos({...formDatos, [e.target.name]: e.target.value})} required className="input-app-campo" type="text" id="nombre"/>
            </div>
            <div className="input-app">
                <label htmlFor="tipo">Tipo de producto:</label>
                <select name="tipo" value={formDatos.tipo} onChange={(e) => guardarFormDatos({...formDatos, [e.target.name]: e.target.value})} id="tipo" required className="input-app-campo">
                    <option>Oro</option>
                    <option>Plata</option>
                    <option>Catalogo</option>
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
                <select onChange={e => obtenerSubcategoria(e)} defaultValue={"Ninguno"} id="subcategoria" required className="input-app-campo">
                    <option disabled>Ninguno</option>
                    { subcategorias.map(el => <option key={el._id} id={el._id}>{el.nombre}</option>) }
                </select>
            </div>
            <div className="input-app">
                <label htmlFor="imagenPortada">Imagen de portada:</label>
                <input required onChange={e => obtenerFoto(e)} className="input-app-campo custom-file-input" type="file" id="imagenPortada"/>
            </div>
            <div className="input-app">
                <label htmlFor="imagenPortada">Imagenes (Aparte de portada):</label>
                <input onChange={e => subirImagenes(e)} multiple className="input-app-campo custom-file-input" type="file" id="imagenPortada"/>
            </div>
            { cargando 
            ? <button type="submit" disabled className="btn btn-orange detalle"><span className="btn-texto">Creando...</span></button>
            : <button type="submit" className="btn btn-orange detalle"><span className="btn-texto">Crear producto</span></button>
            }
        </form>
    );
}

export default FormAgregar;