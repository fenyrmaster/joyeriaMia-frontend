import React, { useEffect } from 'react';
import { recordarUsuario } from '../actions/usuarioAction';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';

const RutaPrivadaAdmin = ({ component: Component, ...props }) => {

    const dispatch = useDispatch();
    const datos = useSelector(state => state.Usuario);

    useEffect(() => {
        const buscarUsuario = async() => {
            await dispatch(recordarUsuario());
        }
        buscarUsuario();
    }, [])

    return(
        <Route {...props} render={props => !datos.cargando && (datos.usuario.rol !== "admin") ? (<Redirect to="/tienda"/>) : (<Component {...props}/>)}/>
    );
}

export default RutaPrivadaAdmin;