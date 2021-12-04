import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImagenLogin from "../img/LoginPicture.jpg"
import { Link, useHistory } from 'react-router-dom';
import { recordarUsuario, accederLogin } from '../actions/usuarioAction';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction';
import SpinnerUser from './SpinnerUser';
import Swal from 'sweetalert2';

const IniciarSesion = () => {

    const [ datosForm, guardarDatosForm ] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() =>  {
        dispatch(recordarUsuario());
    }, []);

    const alerta = useSelector(state => state.Alerta);
    const cargaSpinner = useSelector(state => state.Usuario.cargaSpinner);

    const acceder = e => {
        e.preventDefault();
        if(datosForm.password.length < 8){
            const alerta = {
                clases: "warning",
                mensaje: "La contraseña debe de contener al menos 8 caracteres"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        dispatch(accederLogin(datosForm, history));
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
                        <h1 className="h1acceso">Inicia sesion</h1>
                        <p className="texto-acceso">Accede para seguir comprando en nuestra tienda</p>
                        <form onSubmit={e => acceder(e)} className="login-formulario">
                            <div className="input-label">
                                <label htmlFor="email">Correo Electronico:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="email" name="email" id="email"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="password">Contraseña:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="password" name="password" id="password"/>
                            </div>
                            <button className="btn btn-orange" type="submit"><span className="btn-texto">Acceder</span></button>
                            { cargaSpinner ? <SpinnerUser/> : null}
                        </form>
                        <p>¿Haz olvidado tu contraseña? <Link className="redireccion" to="/cuentaOlvidada">Recuperar cuenta</Link></p>
                        <p>¿No tienes cuenta? <Link className="redireccion" to="/registrarse">Crear cuenta</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IniciarSesion;