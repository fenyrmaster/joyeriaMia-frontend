import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Caracteristicas from './Caracteristicas';
import ProductosPopulares from './ProductosPopulares';
import SwiperImage from './SwiperImage';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosPopular } from '../actions/productosAction';
import { recordarUsuario } from '../actions/usuarioAction';
import Spinner from './Spinner';

const Inicio = () => {

    const dispatch = useDispatch();

    const [ vendidos, guardarVendidos ] = useState(null);
    const cargando = useSelector(state => state.Producto.cargando);
    
    useEffect(() =>  {
        dispatch(recordarUsuario());
        guardarVendidos(true);
    }, [])

    useEffect(() => {
        document.title = "La mejor joyeria de Mexico | Joyeria Mia"
    });

    useEffect(() => {
        dispatch(obtenerProductosPopular(vendidos));
    }, [vendidos]);

    const consultarMasVendidos = e => {
        if(e.target.id === "masVendidos" && !vendidos){
            guardarVendidos(true);
            return
        }
        if(e.target.id === "promociones" && vendidos){
            guardarVendidos(false);
            return
        } 
    }

    return(
        <Fragment>
            <SwiperImage/>
            <h2 className="titulo-caracteristicas">Tenemos los materiales de la mejor calidad</h2>
            <Caracteristicas/>
            <h2 className="titulo-caracteristicas">Mira nuestros mejores productos</h2>
            <div className="mejores-productos">
                <button id="masVendidos" onClick={e => consultarMasVendidos(e)} className={ vendidos ? "mejores-productos-boton mejores-activo" : "mejores-productos-boton" }>Lo mas vendido</button>
                <button id="promociones" onClick={e => consultarMasVendidos(e)} className={ vendidos ? "mejores-productos-boton" : "mejores-productos-boton mejores-activo" }>Promociones</button>
            </div>
            { cargando ? <Spinner/> : <ProductosPopulares/> }
        </Fragment>
    );
}

export default Inicio