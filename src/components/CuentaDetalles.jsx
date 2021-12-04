import React from 'react';
import { useSelector } from 'react-redux';

const CuentaDetalles = () => {

    const usuario = useSelector(state => state.Usuario.usuario);

    if(!usuario) return null;

    return(
        <div className="cuenta-detalles">
            <div className="cuenta-detalle">
                <h4>Nombre:</h4>
                <p>{usuario.nombre}</p>
            </div>
            <div className="cuenta-detalle">
                <h4>Telefono:</h4>
                <p>{usuario.telefono}</p>
            </div>
            <div className="cuenta-detalle">
                <h4>Correo:</h4>
                <p>{usuario.email}</p>
            </div>
            <div className="cuenta-detalle">
                <h4>Domicilio:</h4>
                <p>{usuario.domicilio}</p>
            </div>
            <div className="cuenta-detalle">
                <h4>Detalles del domicilio:</h4>
                <p>{usuario.domicilioDetalles}</p>
            </div>
            <div className="cuenta-detalle">
                <h4>Localidad y municipio:</h4>
                <p>{usuario.localidad}</p>
            </div>
        </div>
    );
}

export default CuentaDetalles;