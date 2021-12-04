import React, { useEffect } from 'react';
import { recordarUsuario } from '../actions/usuarioAction';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';

const RutaPrivada = ({ component: Component, ...props }) => {

    const dispatch = useDispatch();
    const datos = useSelector(state => state.Usuario);

    useEffect(() => {
        const buscarUsuario = async() => {
            await dispatch(recordarUsuario());
        }
        buscarUsuario();
    }, [])

    return(
        <Route {...props} render={props => !datos.cargando && !datos.autenticado ? (<Redirect to="/iniciar-sesion"/>) : (<Component {...props}/>)}/>
    );
}

export default RutaPrivada;