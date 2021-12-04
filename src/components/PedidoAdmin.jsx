import React from 'react';
import ProductoPedido from './ProductoPedido';

const PedidoAdmin = ({pedido}) => {
    return(
    <div className="pedido">
        <h3 className="h3-pedido">Codigo del pedido: {pedido.codigo}</h3>
        <p className="codigo-pedido">Datos del cliente:</p>
        <div className="info-cliente">
            <p className="codigo-pedido info-cliente-contenedor">Nombre del cliente: {pedido.nombre}</p>
            <p className="codigo-pedido info-cliente-contenedor">Correo del cliente: {pedido.email}</p>
            <p className="codigo-pedido info-cliente-contenedor">Telefono del cliente: {pedido.telefono}</p>
            <p className="codigo-pedido info-cliente-contenedor">Metodo de pago: {(pedido.metodoPago === "Tarjeta") ? "Transferencia" : "Deposito"}</p>
        </div>
        <p className="codigo-pedido">Datos del domicilio:</p>
        <div className="info-cliente">
            <p className="codigo-pedido info-cliente-contenedor">Domicilio: {pedido.domicilio}</p>
            <p className="codigo-pedido info-cliente-contenedor">Detalles del domicilio: {pedido.domicilioDetalles}</p>
            <p className="codigo-pedido info-cliente-contenedor">Selecciono envio?: {pedido.envio ? "Si" : "No"}</p>
            <p className="codigo-pedido info-cliente-contenedor">Localidad: {pedido.localidad}</p>
        </div>
        <div className="productos-pedido">
            { pedido.carrito.map(producto => <ProductoPedido key={producto._id} producto={producto}/>) }
        </div>
        <p className="total">Total: <span>{pedido.total}$</span></p>
    </div>
    );
}

export default PedidoAdmin;