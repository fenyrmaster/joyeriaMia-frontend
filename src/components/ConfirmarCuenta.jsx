import React, { useEffect } from 'react';
import Spinner from './Spinner';
import { useParams } from 'react-router';
import { confirmarUsuario } from '../actions/usuarioAction';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const ConfirmarCuenta = () => {

    const dispatch = useDispatch();
    const { token } = useParams();
    const history = useHistory();

    useEffect(() => {   
        dispatch(confirmarUsuario(token, history));
    }, []);

    return(
        <Spinner/>
    );
}
export default ConfirmarCuenta;