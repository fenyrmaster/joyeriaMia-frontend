import React, { Fragment } from 'react'
import Logo from "../img/Logo-4.png"
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <div className="footer">
            <img alt="Joyeria mia" src={Logo} className="logotipo" alt="Logotipo joyeria Mia"/>
            <div className="enlaces">
                <div className="informacion">
                    <h3 className="h3-info">Informacion</h3>
                    <div className="enlaces-footer">
                        <div className="enlaces-footer-enlace llamada">
                            <ion-icon name="call"></ion-icon>
                            <p className="texto-info">33 1281 6322</p>
                        </div>
                        <div className="enlaces-footer-enlace domicilio">
                            <ion-icon name="location"></ion-icon>
                            <div className="horarios">
                                <p className="texto-info primero">Centro joyero republica</p>
                                <p className="texto-info">Republica No.7 Local 20</p>
                                <p className="texto-info">Col. San juan de dios</p>
                                <p className="texto-info">C.P. 44360</p>
                            </div>
                        </div>
                        <div className="enlaces-footer-enlace">
                            <ion-icon name="mail"></ion-icon>
                            <p className="texto-info">mia07joyeria@gmail.com</p>
                        </div>
                        <div className="enlaces-footer-enlace">
                            <ion-icon name="time"></ion-icon>
                            <div className="horarios">
                                <p className="texto-info primero">Lunes a Viernes:</p>
                                <p className="texto-info">10:00AM A 6:00PM</p>
                                <p className="texto-info">Sabado:</p>
                                <p className="texto-info">10:00AM A 3:00PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cuenta">
                    <h3 className="h3-info">Tu cuenta</h3>
                    <div className="enlaces-cuenta">
                        <Link className="enlace-cuenta" to="/app/cuenta">Informacion Personal</Link>
                        <Link className="enlace-cuenta" to="/app/pedidos">Pedidos</Link>
                        <Link className="enlace-cuenta" to="/carrito">Carrito</Link>
                    </div>
                </div>
            </div>
            <div className="copy">
                <p className="copy-texto">&copy; Copyright - Todos los derechos reservados 2021</p>
            </div>
        </div>
    );
}

export default Footer