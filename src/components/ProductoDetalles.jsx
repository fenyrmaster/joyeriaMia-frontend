import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProducto } from '../actions/productosAction';
import { recordarUsuario } from '../actions/usuarioAction';
import SwiperProducto from './SwiperProducto';
import DetallesProducto from './DetallesProducto';
import Spinner from './Spinner';

const ProductoDetalles = () => {

    const cargando = useSelector(state => state.Producto.cargando);
    const { codigo } = useParams();
    const dispatch = useDispatch();
    const producto = useSelector(state => state.Producto.producto);
    useEffect(() =>  {
        dispatch(recordarUsuario());
    }, []);

    useEffect(() => {
        dispatch(obtenerProducto(codigo));
        const productotitulo = document.querySelector(".navegacion");
        productotitulo.scrollIntoView();
    }, [])

    if(!producto && !cargando) return <p className="producto-nohay">El producto con el codigo no existe o fue eliminado</p>

    return(
        <Fragment>
            { cargando ? <Spinner/> :
            <div className="producto-detalles-contenedor">
                <SwiperProducto/>
                <DetallesProducto/>
            </div> }
        </Fragment>
    );
}

export default ProductoDetalles;