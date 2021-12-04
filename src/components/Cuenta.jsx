import React, { useState, useEffect } from 'react';
import NavegacionApp from './NavegacionApp';
import { useHistory } from 'react-router';
import CuentaDetalles from './CuentaDetalles';
import { useDispatch, useSelector } from 'react-redux';
import { cambiarDatosPersonal, cambiarContraseña } from '../actions/usuarioAction';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction';
import Swal from 'sweetalert2';

const Cuenta = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ datosPersonales, guardarDatosPersonales ] = useState({
        nombre: "",
        telefono: "",
        email: ""
    });
    const [ datosDomicilio, guardarDatosDomicilio ] = useState({
        domicilio: "",
        domicilioDetalles: "",
        localidad: ""
    });
    const [ datosContraseña, guardarDatosContraseña ] = useState({
        password: "",
        newPassword: "",
        newPasswordConfirm: ""
    })

    const usuario = useSelector(state => state.Usuario.usuario);

    useEffect( () => {
        if(usuario){
            guardarDatosPersonales({
                ...datosPersonales,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                email: usuario.email
            });
            guardarDatosDomicilio({
                ...datosDomicilio,
                domicilio: usuario.domicilio,
                domicilioDetalles: usuario.domicilioDetalles,
                localidad: usuario.localidad
            })
        }
    }, [usuario]);
    useEffect(() => {
        const productotitulo = document.querySelector(".navegacion");
        productotitulo.scrollIntoView();
    }, []);

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

    if(!usuario) return null;

    const actualizarDatosPersonales = e => {
        e.preventDefault();
        dispatch(cambiarDatosPersonal(datosPersonales));
    }
    const actualizarDomicilio = e => {
        e.preventDefault();
        dispatch(cambiarDatosPersonal(datosDomicilio));
    }
    const actualizarPassword = e => {
        e.preventDefault();
        if(datosContraseña.newPassword.length < 8){
            let alerta = {
                mensaje: "Una contraseña debe de tener al menos 8 caracteres",
                clases: "warning"
            }
            dispatch(mostrarAlerta(alerta));
            return
        }
        if(datosContraseña.newPassword !== datosContraseña.newPasswordConfirm){
            let alerta = {
                mensaje: "Las nuevas contraseñas no son las mismas",
                clases: "warning"
            }
            dispatch(mostrarAlerta(alerta));
            return
        }
        dispatch(cambiarContraseña(datosContraseña, guardarDatosContraseña));
    }

    return(
        <div className="app-contenedor">
            <NavegacionApp/>
            <div className="contenido">
                <h2 className="titulo-caracteristicas cuenta-h2">Datos de tu cuenta</h2>
                <CuentaDetalles/>
                <h2 className="titulo-caracteristicas cuenta-h2">Cambiar datos</h2>
                <form onSubmit={e => actualizarDatosPersonales(e)} className="form-agregar form-espacio">
                    <h3 className="h3-agregar">Datos personales</h3>
                    <div className="input-app">
                        <label htmlFor="nombre">Nombre:</label>
                        <input required value={datosPersonales.nombre} onChange={(e) => guardarDatosPersonales({...datosPersonales, [e.target.name]: e.target.value})} name="nombre" className="input-app-campo" type="text" id="nombre"/>
                    </div>
                    <div className="input-app">
                        <label htmlFor="telefono">Telefono:</label>
                        <input required value={datosPersonales.telefono} onChange={(e) => guardarDatosPersonales({...datosPersonales, [e.target.name]: e.target.value})} name="telefono" className="input-app-campo" type="text" id="telefono"/>
                    </div>
                    <div className="input-app">
                        <label htmlFor="correo">Correo:</label>
                        <input required value={datosPersonales.email} onChange={(e) => guardarDatosPersonales({...datosPersonales, [e.target.name]: e.target.value})} name="email" className="input-app-campo" type="email" id="correo"/>
                    </div>
                    <button className="btn btn-orange"><span className="btn-texto">Cambiar Datos personales</span></button>
                </form>
                <form onSubmit={e => actualizarDomicilio(e)} className="form-agregar form-espacio">
                <h3 className="h3-agregar">Domicilio</h3>
                    <div className="input-app">
                        <label htmlFor="domicilio">Domicilio:</label>
                        <input required value={datosDomicilio.domicilio} onChange={(e) => guardarDatosDomicilio({...datosDomicilio, [e.target.name]: e.target.value})} name="domicilio" className="input-app-campo" type="text" id="domicilio"/>
                    </div>
                    <div className="input-app">
                        <label htmlFor="domicilio-detalles">Detalles del Domicilio:</label>
                        <input value={datosDomicilio.domicilioDetalles} onChange={(e) => guardarDatosDomicilio({...datosDomicilio, [e.target.name]: e.target.value})} name="domicilioDetalles" className="input-app-campo" type="text" id="domicilio-detalles"/>
                    </div>
                    <div className="input-app">
                        <label htmlFor="domicilio-detalles">Estado y municipio:</label>
                        <input value={datosDomicilio.localidad} onChange={(e) => guardarDatosDomicilio({...datosDomicilio, [e.target.name]: e.target.value})} name="localidad" className="input-app-campo" type="text" id="domicilio-detalles"/>
                    </div>
                    <button className="btn btn-orange"><span className="btn-texto">Cambiar domicilio</span></button>
                </form>
                <form onSubmit={e => actualizarPassword(e)} className="form-agregar form-espacio">
                <h3 className="h3-agregar">Contraseña</h3>
                    <div className="input-app">
                        <label htmlFor="contraseña-actual">Contraseña Actual:</label>
                        <input required value={datosContraseña.password} onChange={(e) => guardarDatosContraseña({...datosContraseña, [e.target.name]: e.target.value})} name="password" className="input-app-campo" type="password" id="contraseña-actual"/>
                    </div>
                    <div className="input-app">
                        <label htmlFor="contraseña-nueva">Contraseña Nueva:</label>
                        <input required value={datosContraseña.newPassword} onChange={(e) => guardarDatosContraseña({...datosContraseña, [e.target.name]: e.target.value})} name="newPassword" className="input-app-campo" type="password" id="contraseña-nueva"/>
                    </div>
                    <div className="input-app">
                        <label htmlFor="contraseña-nueva-confirmar">Confirmar Contraseña Nueva:</label>
                        <input required value={datosContraseña.newPasswordConfirm} onChange={(e) => guardarDatosContraseña({...datosContraseña, [e.target.name]: e.target.value})} name="newPasswordConfirm" className="input-app-campo" type="password" id="contraseña-nueva-confirmar"/>
                    </div>
                    <button className="btn btn-orange"><span className="btn-texto">Cambiar contraseña</span></button>
                </form>
            </div>
        </div>
    );
}

export default Cuenta;