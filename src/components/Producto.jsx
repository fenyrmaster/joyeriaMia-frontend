import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { agregarCarro } from '../actions/usuarioAction';

const Producto = ({producto}) => {

    const dispatch = useDispatch();
    const autenticado = useSelector(state => state.Usuario.autenticado);

    const agregarProducto = (id, auth) => {
        dispatch(agregarCarro(id, auth));
    }

    return(
        <div className="producto">
            <img alt={producto.nombre} src={producto.imagenPortada}  className="imagen-producto"/>
            <div className="producto-datos-column">
                <div>
                    <h4 className="nombreProducto">{producto.nombre}</h4>
                    <p className="codigoProducto">Codigo: {producto.codigo}</p>
                    {(producto.promocionFecha && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="codigoProducto promo-activa">En oferta!: {producto.promocionPorcentaje}%</p> : null}
                    {(producto.promocionFecha && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="codigoProducto promo-activa reducido">Termina en: {new Date(producto.promocionFecha).toLocaleString({}, {timeZone:"UTC",month:"long", day:"2-digit", year:"numeric"})}</p> : null}
                    {(producto.promocionFecha && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="precioAnterior">{producto.precio}$</p> : null}
                    {(producto.promocionFecha && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="precioProducto precioDescontado">{Math.ceil((producto.precio / 100)*(100 - producto.promocionPorcentaje))}$</p> : <p className="precioProducto">{producto.precio}$</p>}
                </div>
                <div className="abajo">
                    <Link to={`/productos/${producto.codigo}`} className="btn btn-pink btn-producto"><span className="btn-texto">Ver mas detalles</span></Link>
                    <button onClick={() => agregarProducto(producto._id, autenticado)} className="btn btn-orange btn-producto"><span className="btn-texto">Agregar al carrito</span></button>
                </div>
            </div>
        </div>
    );
}

export default Producto;