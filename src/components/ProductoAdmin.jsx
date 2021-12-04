import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ponerProductoPromocion, ponerProductosEliminar, ponerProductosEditar } from '../actions/productosAction';

const ProductoAdmin = ({producto}) => {

    const dispatch = useDispatch();

    return(
        <div className="producto">
            <img alt={producto.nombre} src={producto.imagenPortada}  className="imagen-producto"/>
            <h4 className="nombreProducto">{producto.nombre}</h4>
            <p className="codigoProducto">Codigo: {producto.codigo}</p>
            <p className="codigoProducto">Peso: {producto.peso}gr</p>
            <p className="codigoProducto">En stock?: {producto.stock ? "Si" : "No"}</p>
            <p className={(producto.promocionFecha && new Date(producto.promocionFecha) > new Date(Date.now())) ? "codigoProducto promo-activa" : "codigoProducto"}>Promocion: {(producto.promocionFecha && new Date(producto.promocionFecha) > new Date(Date.now())) ? `Activa: ${producto.promocionPorcentaje}%` : "Inactiva"}</p>
            {(producto.promocionFecha && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="codigoProducto promo-activa reducido">Termina en: {new Date(producto.promocionFecha).toLocaleString({}, {timeZone:"UTC",month:"long", day:"2-digit", year:"numeric"})}</p> : null}
            <p className="precioProducto">{producto.precio}$</p>
            <button onClick={() => dispatch(ponerProductoPromocion(producto))} className="btn btn-orange btn-producto"><span className="btn-texto">Agregar Promocion</span></button>
            <button onClick={() => dispatch(ponerProductosEditar(producto))} className="btn btn-orange btn-producto"><span className="btn-texto">Actualizar</span></button>
            <button onClick={() => dispatch(ponerProductosEliminar(producto))} className="btn btn-pink btn-producto btn-borrar"><span className="btn-texto">Eliminar</span></button>
        </div>
    );
}

export default ProductoAdmin;