import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerSub } from '../actions/subAction';

const Filtros = ({filtros, guardarFiltros, guardarPagina}) => {

    const dispatch = useDispatch();
    const subcategorias = useSelector(state => state.Subcategoria.subcategorias);

    useEffect(() => {
        dispatch(obtenerSub());
    }, []);

    return(
        <Fragment>
            <div className="materiales">
                <button onClick={() => {guardarFiltros({...filtros, tipo: "Oro"}); guardarPagina(1)}} className={filtros.tipo === "Oro" ? "botones-tienda-materiales boton-tienda-oro tipo-activo" : "botones-tienda-materiales boton-tienda-oro"}>
                    <ion-icon className="tienda-oro" name="diamond"></ion-icon>
                    <p className="texto-tienda">Oro</p>
                </button>
                <button onClick={() => {guardarFiltros({...filtros, tipo: "Plata"}); guardarPagina(1)}} className={filtros.tipo === "Plata" ? "botones-tienda-materiales boton-tienda-plata tipo-activo" : "botones-tienda-materiales boton-tienda-plata"}>
                    <ion-icon className="tienda-plata" name="diamond"></ion-icon>
                    <p className="texto-tienda">Plata</p>
                </button>
                <button onClick={() => {guardarFiltros({...filtros, tipo: "Catalogo"}); guardarPagina(1)}} className={filtros.tipo === "Catalogo" ? "botones-tienda-materiales boton-tienda-catalogo tipo-activo" : "botones-tienda-materiales boton-tienda-catalogo"}>
                    <ion-icon className="tienda-catalogo" name="documents"></ion-icon>
                    <p className="texto-tienda">Catalogo</p>
                </button>
            </div>
            <form className="filtro-subcategorias">
                <label>Filtro de Tipos de joyas</label>
                <select onChange={(e) => {const index = e.target.selectedIndex; const el = e.target.childNodes[index]; guardarFiltros({...filtros, subcategoria: el.getAttribute("id")}); guardarPagina(1)}}>
                    <option id="">Todos</option>
                    { subcategorias.map(el => <option key={el._id} id={el._id}>{el.nombre}</option>) }
                </select>
            </form>
        </Fragment>
    );
}

export default Filtros;