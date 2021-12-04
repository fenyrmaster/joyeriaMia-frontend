import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ponerSubEliminar, ponerSubEditar } from '../actions/subAction';

const Subcategoria = ({subcategoria}) => {

    const dispatch = useDispatch();

    const subEliminarPregunta = () => {
        dispatch(ponerSubEliminar(subcategoria))
    }
    const subEditarPregunta = () => {
        dispatch(ponerSubEditar(subcategoria));
    }

    return(
        <div className="subcategoria-contenedor">
            <div className="datos-subcategoria">
                <h3>{subcategoria.nombre}</h3>
                <div className="medidas-opciones">
                    <p>Medidas opciones: <span>{subcategoria.medidas}</span></p>
                </div>
            </div>
            <div className="acciones-subcategoria">
                <button onClick={() => subEditarPregunta()} className="btn btn-pink btn-subcategorias" to="/"><span className="btn-texto">Actualizar</span></button>
                <button onClick={() => subEliminarPregunta()} className="btn btn-orange btn-subcategorias" to="/"><span className="btn-texto">Eliminar</span></button>
            </div>
        </div>
    );
}

export default Subcategoria;