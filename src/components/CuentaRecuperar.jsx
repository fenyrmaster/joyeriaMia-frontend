import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImagenLogin from "../img/LoginPicture.jpg"
import { Link, useHistory, useParams } from 'react-router-dom';
import { recordarUsuario, recuperarContraseña } from '../actions/usuarioAction';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction';
import Swal from 'sweetalert2';

const CuentaRecuperar = () => {

    const {token} = useParams();

    const [ datosForm, guardarDatosForm ] = useState({
        confirmarPassword: "",
        password: ""
    });

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>  {
        dispatch(recordarUsuario());
    }, []);

    const alerta = useSelector(state => state.Alerta);

    const recuperar = e => {
        e.preventDefault();
        if(datosForm.password !== datosForm.confirmarPassword){
            const alerta = {
                clases: "warning",
                mensaje: "La contraseñas no son las mismas"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        dispatch(recuperarContraseña(datosForm, history, token));
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
                        <h1 className="h1acceso">Restablecer contraseña</h1>
                        <p className="texto-acceso">Pon la nueva contraseña para tu cuenta</p>
                        <form onSubmit={e => recuperar(e)} className="login-formulario">
                            <div className="input-label">
                                <label htmlFor="password">Contraseña nueva:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="password" name="password" id="password"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="confirmarPassword">Confirmar contraseña nueva:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="password" name="confirmarPassword" id="confirmarPassword"/>
                            </div>
                            <button className="btn btn-orange" type="submit"><span className="btn-texto">Restablecer</span></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CuentaRecuperar;