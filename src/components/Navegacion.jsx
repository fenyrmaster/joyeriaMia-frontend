import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../img/Logo-3.png";
import alertasReducer from '../reducers/alertasReducer';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { salirCuenta } from '../actions/usuarioAction';

const Navegacion = () => {

    const dispatch = useDispatch();

    const usuario = useSelector(state => state.Usuario.usuario);

    const history = useHistory();
    const [ botonMovil, GuardarBotonMovil ] = useState(false);

    useEffect(() => {
        return history.listen((location) => {
            GuardarBotonMovil(false);
        })
    }, []);

    return(
        <Fragment>
            <div className={ botonMovil ? "difuminador difuminador-activo" : "difuminador "}></div>
                <nav className="navegacion">
                    <div className={ botonMovil ? "Navegacion-principal activo-2" : "Navegacion-principal"}>
                        <div className="Navegador">
                            <Link className="enlace" to={"/"}>
                                <ion-icon name="home"></ion-icon>
                                <p>Inicio</p>    
                            </Link>
                        </div>
                        <div className="Navegador">
                            <Link className="enlace" to={"/tienda"}>
                                <ion-icon name="bag-handle"></ion-icon>
                                <p>Tienda</p>    
                            </Link>
                        </div>
                    </div>
                    <div className="contenedor-logo">
                        <img alt="joyeria-mia" className="logo" src={Logo} />
                    </div>
                    <div className={ botonMovil ? "autenticacion activo" : "autenticacion"}>
                        <div className="Navegador">
                            { usuario 
                            ? <a href="#" onClick={() => dispatch(salirCuenta(history))} className="enlace">
                                <ion-icon name="log-out"></ion-icon>
                                <p>Salir</p>    
                              </a>
                            : <Link className="enlace" to={"/iniciar-sesion"}>
                                <ion-icon name="log-in"></ion-icon>
                                <p>Acceder</p>    
                              </Link>
                            }

                        </div>
                        <div className="Navegador">
                            { usuario
                            ? <Link className="enlace" to={"/app/pedidos"}>
                                <ion-icon name="clipboard"></ion-icon>
                                <p>Pedidos</p>    
                              </Link> 
                            : <Link className="enlace" to={"/registrarse"}>
                                <ion-icon name="person-add"></ion-icon>
                                <p>Registrarse</p>    
                              </Link>  }
                        </div>
                        <div className="Navegador">
                            <Link className="enlace" to={"/carrito"}>
                                <ion-icon name="cart"></ion-icon>
                                <p>Carrito</p>
                                <span className="cantidad-compras">{(!usuario || usuario.carrito === 0) ? 0 : usuario.carrito.length}</span>    
                            </Link>
                        </div>
                    </div>
                    <div className="menu-hamburguesa-contenedor" onClick={() => botonMovil ? GuardarBotonMovil(false): GuardarBotonMovil(true)}>
                        <div className={botonMovil ? "menu-hamburguesa abierto" : "menu-hamburguesa"}></div>
                    </div>
                </nav>
        </Fragment>
    );
}

export default Navegacion;