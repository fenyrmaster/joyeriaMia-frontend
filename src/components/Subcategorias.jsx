import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavegacionApp from './NavegacionApp';
import Subcategoria from './Subcategoria';
import Swal from 'sweetalert2';
import { obtenerSubAdmin, crearSub, cancelarEliminado, eliminarSub, cancelarEditado, editarSub } from '../actions/subAction';

const Subcategorias = () => {

    const dispatch = useDispatch();
    const resultados = useSelector(state => state.Subcategoria.subAdmin);
    const subBorrar = useSelector(state => state.Subcategoria.subEliminar);
    const subEditar = useSelector(state => state.Subcategoria.subEditar);

    const [ formCrear, guardarFormCrear ] = useState(false);
    const [ formEditar, guardarFormEditar ] = useState(false);
    const [ subCrear, guardarSubCrear ] = useState({
        nombre: "",
        medidas: "",
    });
    const [ subEditarForm, guardarSubEditar ] = useState({
        nombre: "",
        medidas: "",
    });
    const [ cargarCreacion, guardarcargarCreacion ] = useState(false);
    const [ cargarEdicion, guardarcargarEdicion ] = useState(false);
    const crearSubcategoria = e => {
        e.preventDefault();
        dispatch(crearSub(subCrear, guardarFormCrear, guardarSubCrear, guardarcargarCreacion));
    }
    useEffect(() => {
        dispatch(obtenerSubAdmin());
    }, []);
    useEffect(() => {
        if(Object.keys(subBorrar).length !== 0){
            Swal.fire({
                title: `Seguro que quieres borrar ${subBorrar.nombre}`,
                text: "No podras revertir esta accion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(eliminarSub(subBorrar));
                } else if(result.isDismissed){
                    dispatch(cancelarEliminado());
                }
              })
        }
    }, [subBorrar]);
    useEffect(() => {
        if(Object.keys(subEditar).length !== 0){
            guardarFormEditar(true);
            guardarSubEditar({
                ...subEditarForm,
                nombre: subEditar.nombre,
                centimetros: subEditar.centimetros,
                medidas: subEditar.medidas
            })
        }
    }, [subEditar]);
    const cancelarEdicion = () => {
        guardarFormEditar(false);
        guardarSubEditar({
            ...formEditar,
            nombre: "",
            medidas: "",
            centimetros: ""
        })
        dispatch(cancelarEditado());
    }
    const editarSubcategoria = e =>{
        e.preventDefault();
        dispatch(editarSub(subEditarForm, subEditar._id, guardarFormEditar, guardarSubEditar, guardarcargarEdicion))
    }

    return(
        <div className="app-contenedor">
            <div className={ (formCrear || formEditar) ? "popup" : "popup hiddenFill"}></div>
            <form onSubmit={e => crearSubcategoria(e)} className={ formCrear ? "formar form" : "formar form hiddenForm"}>
                <div className="input-app">
                    <label htmlFor="nombre">Nombre de la subcategoria:</label>
                    <input required value={subCrear.nombre} onChange={(e) => guardarSubCrear({...subCrear, [e.target.name]: e.target.value})} name="nombre" className="input-app-campo" type="text" id="nombre"/>
                </div>
                <div className="input-app">
                    <label htmlFor="nombre">Medidas(tallas, separadas por comas, ejemplo: "5,5.5,6,6.5"):</label>
                    <input required value={subCrear.medidas} onChange={(e) => guardarSubCrear({...subCrear, [e.target.name]: e.target.value})} name="medidas" className="input-app-campo" type="text" id="nombre"/>
                </div>
                <div className="acciones">
                    { cargarCreacion ? <button disabled className="btn btn-pink" type="submit"><span className="btn-texto">Creando...</span></button> : <button className="btn btn-pink" type="submit"><span className="btn-texto">Crear</span></button> }
                    <button onClick={() => guardarFormCrear(false)} className="btn btn-orange" type="button"><span className="btn-texto">Cancelar</span></button>
                </div>
            </form>
            <form onSubmit={e => editarSubcategoria(e)} className={ formEditar ? "formar form" : "formar form hiddenForm"}>
                <div className="input-app">
                    <label htmlFor="nombre">Nombre de la subcategoria:</label>
                    <input required value={subEditarForm.nombre} onChange={(e) => guardarSubEditar({...subEditarForm, [e.target.name]: e.target.value})} name="nombre" className="input-app-campo" type="text" id="nombre"/>
                </div>
                <div className="input-app">
                    <label htmlFor="nombre">Medidas(tallas, separadas por comas, ejemplo: "5,5.5,6,6.5"):</label>
                    <input required value={subEditarForm.medidas} onChange={(e) => guardarSubEditar({...subEditarForm, [e.target.name]: e.target.value})} name="medidas" className="input-app-campo" type="text" id="nombre"/>
                </div>
                <div className="acciones">
                    { cargarEdicion ? <button disabled className="btn btn-pink" type="submit"><span className="btn-texto">Editando...</span></button> : <button className="btn btn-pink" type="submit"><span className="btn-texto">Editar</span></button> }
                    <button onClick={() => cancelarEdicion()} className="btn btn-orange" type="button"><span className="btn-texto">Cancelar</span></button>
                </div>
            </form>
            <NavegacionApp/>
            <div className="contenido">
                <div className="boton-crear-contenedor">
                    <button className="boton-crear" onClick={() => guardarFormCrear(true)}>Crear Subcategoria</button>
                </div>
                <p className="datos-producto peque">Nota: Para eliminar una subcategoria, debes de eliminar o cambiar la subcategoria de los productos que tienen la subcategoria que quieres eliminar</p>
                { (resultados.length !== 0) ? resultados.map(el => <Subcategoria key={el._id} subcategoria={el} />) : <p className="producto-no">No hay resultados</p> }
            </div>
        </div>
    );
}

export default Subcategorias;