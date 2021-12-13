import React from 'react';
import ProductoPedido from './ProductoPedido';
import { useSelector } from 'react-redux';

const Pedido = ({pedido}) => {

    const tarjeta = useSelector(state => state.Usuario.tarjeta);

    return(
    <div className="pedido">
        { pedido.envio 
        ? <h3 className="h3-pedido">Contactate con nosotros para acordar el precio del envio</h3>
        : <h3 className="h3-pedido">Contactate con nosotros para acordar la recoleccion</h3>
        }
        { pedido.metodoPago === "OXXO"
        ? <p className="codigo-pedido">Contactate con nosotros, debes de realizar el deposito a la tarjeta {tarjeta}</p>
        : <p className="codigo-pedido">Contactate con nosotros, debes de realizar la transferencia a la tarjeta {tarjeta}</p>
        }
        <p className="codigo-pedido">Codigo de pedido: {pedido.codigo}</p>
        <p className="codigo-pedido margin-casi">Nuestro Telefono: 3312816322</p>
        <p className="codigo-pedido margin-casi">Nuestro Correo: mia07joyeria@gmail.com</p>
        <div className="productos-pedido">
            { pedido.carrito.map(producto => <ProductoPedido key={producto._id} producto={producto}/>) }
        </div>
        <p className="total">Total: <span>{pedido.total}$</span></p>
    </div>
    );
}

export default Pedido;