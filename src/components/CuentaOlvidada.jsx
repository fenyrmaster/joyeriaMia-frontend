import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImagenLogin from "../img/LoginPicture.jpg"
import { Link, useHistory } from 'react-router-dom';
import { recordarUsuario, cuentaOlvidada } from '../actions/usuarioAction';
import { ocultarAlerta } from '../actions/alertaAction';
import Swal from 'sweetalert2';

const CuentaOlvidada = () => {

    const [ datosForm, guardarDatosForm ] = useState({
        email: ""
    });

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>  {
        dispatch(recordarUsuario());
    }, []);

    const alerta = useSelector(state => state.Alerta);

    const recuperar = e => {
        e.preventDefault();
        dispatch(cuentaOlvidada(datosForm, history));
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

    return(
        <div className="iniciar-sesion-contenedor">
            <div className="iniciar-sesion-fondo">
                <div className="iniciar-sesion-fondo-2">
                    <img alt="imagen-decorativa" src={ImagenLogin}/>
                    <div className="datos-login">
                        <h1 className="h1acceso">Recuperar cuenta</h1>
                        <p className="texto-acceso">Pon el correo electronico que usas para tu cuenta</p>
                        <form onSubmit={e => recuperar(e)} className="login-formulario">
                            <div className="input-label">
                                <label htmlFor="email">Correo Electronico:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="email" name="email" id="email"/>
                            </div>
                            <button className="btn btn-orange" type="submit"><span className="btn-texto">Recuperar</span></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CuentaOlvidada;