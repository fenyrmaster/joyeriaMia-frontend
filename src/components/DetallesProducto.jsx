import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { agregarCarro } from '../actions/usuarioAction';

const DetallesProducto = () => {

    const dispatch = useDispatch();
    const autenticado = useSelector(state => state.Usuario.autenticado);
    const producto = useSelector(state => state.Producto.producto);

    const agregarProducto = (id, auth) => {
        dispatch(agregarCarro(id, auth));
    }

    return(
        <div className="detalles-contenedor">
            <h1 className="producto-titulo">{producto.nombre}</h1>
            <p className="datos-producto">Codigo: {producto.codigo}</p>
            <p className="datos-producto">Peso: {producto.peso}gr</p>
            <p className="producto-nota">Nota: Podras definir tu talla (si el producto lo requiere) y la cantidad a la hora de comprar el producto.</p>
            {(producto.promocionFecha && producto.stock && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="codigoProducto promo-activa">En oferta!: {producto.promocionPorcentaje}%</p> : null}
            {(producto.promocionFecha && producto.stock && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="codigoProducto promo-activa reducido">Termina en: {new Date(producto.promocionFecha).toLocaleString({}, {timeZone:"UTC",month:"long", day:"2-digit", year:"numeric"})}</p> : null}
            {(producto.promocionFecha && producto.stock && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="precioAnterior">{producto.precio}$</p> : null}
            {(producto.promocionFecha && producto.stock && new Date(producto.promocionFecha) > new Date(Date.now())) ? <p className="precioProducto precioDescontado">{Math.ceil((producto.precio / 100)*(100 - producto.promocionPorcentaje))}$</p> : <p className="precioProducto">{producto.precio}$</p>}
            { producto.stock 
            ? <button onClick={() => agregarProducto(producto._id, autenticado)} className="carrito-producto">
                <ion-icon name="cart"></ion-icon>
                <p>Añadir al carrito</p>
              </button> 
            : <p className="no-disponible">Este producto no esta en disponible en este momento</p>  
            }
            <div className="caracteristicas-producto">
                <div className="caracteristica-producto">
                    <ion-icon name="lock-closed"></ion-icon>
                    <p>Compras seguras en nuestra pagina</p>
                </div>
                <div className="caracteristica-producto">
                    <ion-icon name="card"></ion-icon>
                    <p>Aceptamos transferencias de dinero o depositos de OXXO</p>
                </div>
                <div className="caracteristica-producto">
                    <ion-icon name="golf"></ion-icon>           
                    <p>La mejor calidad en el mercado</p>
                </div>
            </div>
        </div>
    );
}

export default DetallesProducto;