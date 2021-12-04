import React from 'react'

const ProductoPedido = ({producto}) => {
    return(
        <div className="pedido-contenido">
            <div className="imagen-producto">
                <img alt={producto.nombre} src={producto.imagenPortada}/>
            </div>
            <div className="producto-datos pedido-datos">
                <div className="datos-basicos">
                    <h4 className="texto-producto-carrito">{producto.nombre}</h4>
                    <p className="codigo">Codigo: {producto.codigo}</p>
                    <p className="precio">${producto.precio}</p>
                    <p className="cantidad-pedido">Cantidad: <span>{producto.cantidad}</span></p>
                    <p className="cantidad-talla">Medida: <span>{producto.medida}</span></p>
                </div>
            </div>
        </div>
    );
}

export default ProductoPedido;