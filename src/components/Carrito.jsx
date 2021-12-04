import React, { Fragment, useEffect, useState } from 'react';
import ProductoCarrito from './ProductoCarrito';
import { useHistory } from 'react-router';
import Oxxo from "../img/Oxxo_logo.png";
import Mastercard from "../img/Mastercard_logo.png";
import Visa from "../img/Visa_logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction';
import { cambiarEnvioAPI, cambiarMetodoAPI, calcularTotalAPI } from '../actions/usuarioAction';
import { crearPedido } from '../actions/pedidoAction';
import Swal from 'sweetalert2';

const Carrito = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const usuario = useSelector(state => state.Usuario.usuario);
    const tarjeta = useSelector(state => state.Usuario.tarjeta);
    const alerta = useSelector(state => state.Alerta);
    const [ pedido, guardarPedido ] = useState(false);

    useEffect(() =>  {
        const productotitulo = document.querySelector(".navegacion");
        productotitulo.scrollIntoView();
        dispatch(calcularTotalAPI());
    }, []);

    const cambiarEnvio = envio => {
        dispatch(cambiarEnvioAPI(envio));
    }
    const cambiarPago = metodoPago => {
        dispatch(cambiarMetodoAPI(metodoPago));
    }

    const realizarPedido = () => {
        let validacion = true;
        guardarPedido(true);
        usuario.carrito.every(el => {
            if(!el.producto){
                const alerta = {
                    clases: "warning",
                    mensaje: "Hay productos eliminados en su carrito, eliminelos de su carrito"
                }
                validacion = false;
                guardarPedido(false);
                dispatch(mostrarAlerta(alerta));
                return false;
            } else{
                if(!el.producto.stock){
                    const alerta = {
                        clases: "warning",
                        mensaje: "Hay productos que no estan disponibles en su carrito, elimine los productos que no estan disponibles"
                    }
                    validacion = false;
                    guardarPedido(false);
                    dispatch(mostrarAlerta(alerta));
                    return false;
                }
                else if(el.cantidad <= 0 || el.cantidad === ""){
                    const alerta = {
                        clases: "warning",
                        mensaje: "Hay productos que no se les especifico la cantidad correctamente, especificala"
                    }
                    validacion = false;
                    guardarPedido(false);
                    dispatch(mostrarAlerta(alerta));
                    return false;
                } else{
                    if(el.talla === "0"){
                        const alerta = {
                            clases: "warning",
                            mensaje: "Selecciona una talla para cada producto, si no lo requiere, seleccione 'No ocupa'"
                        }
                        validacion = false;
                        guardarPedido(false);
                        dispatch(mostrarAlerta(alerta));
                        return false;
                    } else{
                        return true;
                    }
                }
                
            }
        });
        if(validacion){
            dispatch(crearPedido(usuario._id, history));
        }
    }

    useEffect(() => {
        if(alerta.mensaje){
            Swal.fire({
                title: 'Alerta',
                text: alerta.mensaje,
                icon: alerta.clases,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(ocultarAlerta());
                }
              })
        }
    }, [alerta]);

    if(!usuario) return null
    if(usuario.carrito.length === 0) return <p className="producto-nohay">No hay productos en el carrito</p>

    return(
        <Fragment>
            <h1 className="h1carrito">Tu carrito</h1>
            <div className="carrito-contenedor">
                <div className="productos-carrito-contenedor">
                    <h3 className="titulo-carrito">Tus productos</h3>
                    { (usuario.carrito !== 0) ? usuario.carrito.map(producto => <ProductoCarrito key={producto._id} producto={producto}/>) : <p className="producto-no">No hay productos</p> }
                </div>
                <div className="opciones-contenedor">
                    <div className="envio-contenedor">
                        <h3 className="titulo-carrito">Envio</h3>
                        <div className="opciones">
                            <button onClick={() => cambiarEnvio(true)} className={usuario.envio ? "envio active-carrito" : "envio"}>
                                <p className="domicilio-opcion">Enviar a tu domicilio</p>
                                <p className="precio-opcion">Precio: Depende de su localizacion</p>
                                <p className="precio-opcion">Nos comunicaremos para ponernos de acuerdo</p>
                                { usuario.envio                                  
                                ? <div className="seleccion">
                                    <ion-icon name="checkbox"></ion-icon>
                                    <p>Seleccionado</p>
                                  </div> 
                                : null
                                }
                            </button>
                            <button onClick={() => cambiarEnvio(false)} className={!usuario.envio ? "envio active-carrito" : "envio"}>
                                <p className="domicilio-opcion">Recolectar en una tienda</p>
                                <p className="precio-opcion">Precio: Gratis</p>
                                <p className="precio-opcion">Su pedido lo recogera en esta direccion:</p>
                                <p className="precio-opcion opciones-envio">Republica No. 20 LOCAL 7</p>
                                <p className="precio-opcion opciones-envio">Centro joyero republica</p>
                                <p className="precio-opcion opciones-envio">Col. San juan de dios C.P. 44360</p>
                                { !usuario.envio                                  
                                ? <div className="seleccion">
                                    <ion-icon name="checkbox"></ion-icon>
                                    <p>Seleccionado</p>
                                  </div> 
                                : null
                                }
                            </button>
                        </div>
                    </div>
                    <div className="metodo-pago-contenedor">
                        <h3 className="titulo-carrito">Selecciona un metodo de pago</h3>
                        <div className="metodo-pago-opciones">
                            <button onClick={() => cambiarPago("OXXO")} className={usuario.metodoPago === "OXXO" ? "oxxo envio active-carrito" : "oxxo envio"}>
                                <div className="imagenes_carrito">
                                    <img className="imagen-carrito" src={Oxxo} alt="OXXO"/>
                                </div>
                                <span>Deposito mediante oxxo</span>
                                <p>Depositaras a la siguiente tarjeta:</p>
                                <p>{tarjeta}</p>
                                { usuario.metodoPago === "OXXO" 
                                ? <div className="seleccion">
                                    <ion-icon name="checkbox"></ion-icon>
                                    <p>Seleccionado</p>
                                  </div>
                                : null
                                }
                            </button>
                            <button onClick={() => cambiarPago("Tarjeta")} className={usuario.metodoPago === "Tarjeta" ? "recoleccion tarjeta-pago active-carrito" : "recoleccion tarjeta-pago"}>
                                <div className="imagenes_carrito">
                                    <img className="imagen-carrito" alt="mastercard" src={Mastercard}/>
                                    <img className="imagen-carrito" alt="visa" src={Visa}/>
                                </div>
                                <span>Transferencia de dinero</span>
                                <p>Transferiras dinero para pagar</p>
                                { usuario.metodoPago === "Tarjeta" 
                                ? <div className="seleccion">
                                    <ion-icon name="checkbox"></ion-icon>
                                    <p>Seleccionado</p>
                                  </div>
                                : null
                                }
                            </button>
                        </div>
                        <p className="total">Total: {usuario.total}$</p>
                        {pedido 
                        ? <button onClick={() => realizarPedido()} disabled className="pagar">Ordenando, espere...</button> 
                        : <button onClick={() => realizarPedido()} className="pagar">Ordenar productos</button>}
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Carrito;