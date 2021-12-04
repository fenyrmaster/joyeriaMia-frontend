import React, { useState, useEffect, Fragment } from 'react';
import { eliminarCarro, cambiarMedidasAPI, cambiarCantidadAPI } from '../actions/usuarioAction';
import { useDispatch } from 'react-redux';

const ProductoCarrito = ({producto}) => {

    const dispatch = useDispatch();
    const [ cambios, guardarCambios ] = useState(0);

    useEffect(() => {
        if(producto.cantidad !== ""){
            guardarCambios(producto.cantidad);
        } else{
            guardarCambios(0);
        }
    }, []);

    const eliminarProducto = (id) => {
        dispatch(eliminarCarro(id))
    }
    const cambiarMedidas = (medida, id) => {
        dispatch(cambiarMedidasAPI(medida, id));
    }
    const cambiarCantidad = (cantidad, id) => {
        guardarCambios(cantidad);
        if(cantidad !== 0 || cantidad !== ""){
            dispatch(cambiarCantidadAPI(cantidad, id));
        }
    }

    if(!producto.producto) return(
        <div className="producto-contenido eliminado">
            <p className="no-disponible">Este producto fue eliminado, eliminalo del carrito</p>
            <button onClick={() => eliminarProducto(producto._id)} className="eliminardecarrito">Quitar producto</button>
        </div>
    )

    return(
        <div className="producto-contenido">
            <div className="imagen-producto">
                <img alt={producto.producto.nombre} src={producto.producto.imagenPortada}/>
            </div>
            <div className="producto-datos">
                <div className="datos-basicos">
                    <h4 className="texto-producto-carrito">{producto.producto.nombre}</h4>
                    <p className="codigo">Codigo: {producto.producto.codigo}</p>
                    {(producto.producto.promocionFecha && producto.producto.stock && new Date(producto.producto.promocionFecha) > new Date(Date.now())) ? <p className="codigoProducto promo-activa">En oferta!: {producto.producto.promocionPorcentaje}%</p> : null}
                    {(producto.producto.promocionFecha && producto.producto.stock && new Date(producto.producto.promocionFecha) > new Date(Date.now())) ? <p className="codigoProducto promo-activa reducido">Termina en: {new Date(producto.producto.promocionFecha).toLocaleString({}, {timeZone:"UTC",month:"long", day:"2-digit", year:"numeric"})}</p> : null}
                    {(producto.producto.promocionFecha && producto.producto.stock && new Date(producto.producto.promocionFecha) > new Date(Date.now())) ? <p className="precioAnterior">{producto.producto.precio}$</p> : null}
                    {(producto.producto.promocionFecha && producto.producto.stock && new Date(producto.producto.promocionFecha) > new Date(Date.now())) ? <p className="precioProducto precioDescontado">{Math.ceil((producto.producto.precio / 100)*(100 - producto.producto.promocionPorcentaje))}$</p> : <p className="precioProducto">{producto.producto.precio}$</p>}
                    {!producto.producto.stock ? <p className="no-disponible">Este producto no esta en disponible en este momento, eliminalo del carrito</p> : null}
                </div>
                {!producto.producto.stock 
                ? null
                : <form>
                    <div className="input-label-carrito">
                    <label className="label-carrito" htmlFor="cantidad">Medida:</label>
                        <select defaultValue={producto.talla} onChange={e => cambiarMedidas(e.target.value, producto._id)} className="select-carrito" id="cantidad">
                            <option value="0">0</option>
                            { (producto.producto.tipo !== "Catalogo")
                            ? <Fragment> { producto.producto.subcategoria.medidas.includes(",") ? producto.producto.subcategoria.medidas.split(",").map(el => <option value={el} key={el}>{el}</option>) : <option value={producto.producto.subcategoria.medidas}>{producto.producto.subcategoria.medidas}</option> }</Fragment>
                            : <option>No ocupa</option>}
                        </select>
                    </div>
                    <div className="input-label-carrito">
                    <label className="label-carrito" htmlFor="cantidad">Cantidad:</label>
                        <input value={cambios} min="0" onChange={e => cambiarCantidad(parseInt(e.target.value), producto._id)} className="select-carrito carrito-menos" type="number" id="cantidad"/>
                    </div>
                  </form>
                }

                <button onClick={() => eliminarProducto(producto._id)} className="eliminardecarrito">Quitar producto</button>
            </div>
        </div>
    );
}

export default ProductoCarrito;