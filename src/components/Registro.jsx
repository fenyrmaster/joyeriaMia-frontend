import React, { useState, useEffect } from 'react'
import ImagenRegistro from "../img/RegistroImagen.jpg"
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction';
import { crearNuevoUsuario, recordarUsuario } from '../actions/usuarioAction';
import Swal from 'sweetalert2';
import SpinnerUser from './SpinnerUser';

const Registro = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const cargaSpinner = useSelector(state => state.Usuario.cargaSpinner);

    const [ datosForm, guardarDatosForm ] = useState({
        nombre: "",
        domicilio: "",
        email: "",
        telefono: "",
        password: "",
        confirmarPassword: "",
        localidad: ""
    });

    const registrar = e => {
        e.preventDefault();
        if(datosForm.password.length < 8){
            const alerta = {
                clases: "warning",
                mensaje: "La contraseña debe de contener al menos 8 caracteres"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        if(datosForm.password !== datosForm.confirmarPassword){
            const alerta = {
                clases: "warning",
                mensaje: "Las contraseñas deben de ser las mismas"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        dispatch(crearNuevoUsuario(datosForm, history));
    }

    const alerta = useSelector(state => state.Alerta);

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

    useEffect(() =>  {
        dispatch(recordarUsuario());
    }, [])

    return(
        <div className="iniciar-sesion-contenedor registro">
            <div className="iniciar-sesion-fondo">
                <div className="iniciar-sesion-fondo-2">
                    <img  alt="imagen-decorativa" src={ImagenRegistro}/>
                    <div className="datos-login">
                        <h1 className="h1acceso">Registrarme</h1>
                        <p className="texto-acceso">Comienza a comprar nuestros increibles productos</p>
                        <form onSubmit={e => registrar(e)} className="login-formulario">
                            <div className="input-label">
                                <label htmlFor="nombre">Nombre:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="text" name="nombre" id="nombre"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="domicilio">Domicilio:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="text" name="domicilio" id="domicilio"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="domicilio">Estado y municipio:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="text" name="localidad" id="domicilio"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="email">Correo Electronico:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="email" name="email" id="email"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="telefono">Telefono:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="text" name="telefono" id="telefono"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="password">Contraseña:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="password" name="password" id="password"/>
                            </div>
                            <div className="input-label">
                                <label htmlFor="confirmarPassword">Confirmar Contraseña:</label>
                                <input required onChange={e => guardarDatosForm({...datosForm, [e.target.name]: e.target.value})} type="password" name="confirmarPassword" id="confirmarPassword"/>
                            </div>
                            <button className="btn btn-orange" type="submit"><span className="btn-texto">Registrarme</span></button>
                            { cargaSpinner ? <SpinnerUser/> : null}
                        </form>
                        <p>¿Ya tienes cuenta? <Link className="redireccion" to="/iniciar-sesion">Iniciar Sesion</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;