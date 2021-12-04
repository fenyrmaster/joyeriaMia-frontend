import React, { useEffect, useState, Fragment } from 'react';
import Filtros from './Filtros';
import Productos from './Productos';
import { obtenerProductos } from '../actions/productosAction';
import { useDispatch, useSelector } from "react-redux";
import { recordarUsuario } from '../actions/usuarioAction';
import Spinner from './Spinner';

const Tienda = () => {

    const dispatch = useDispatch();
    const [ pagina, guardarPagina ] = useState(1);
    const [ filtros, guardarFiltros ] = useState({
        tipo: "Oro",
        subcategoria: ""
    });
    const cargando = useSelector(state => state.Producto.cargando);

    useEffect(() => {
        document.title = "Compra joyas de oro y plata en Mexico | Joyeria Mia"
    })
    useEffect(() =>  {
        dispatch(recordarUsuario());
    }, []);
    useEffect(() => {
        dispatch(obtenerProductos(pagina, filtros));
        let materiales = document.querySelector(".materiales");
        materiales.scrollIntoView({behavior: 'smooth'});
    }, [pagina, filtros]);

    return(
        <Fragment>
            <h1 className="titulo-tienda">Busca entre nuestros productos</h1>
            <div className="tienda-contenedor">
                <Filtros filtros={filtros} guardarFiltros={guardarFiltros} guardarPagina={guardarPagina}/>
                {cargando ? <Spinner/> : <Productos pagina={pagina} guardarPagina={guardarPagina}/> }
            </div>
        </Fragment>
    );
}

export default Tienda;