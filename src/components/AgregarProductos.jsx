import React from 'react';
import NavegacionApp from './NavegacionApp';
import FormAgregar from './FormAgregar';

const AgregarProductos = () => {
    return(
        <div className="app-contenedor">
        <NavegacionApp/>
        <div className="contenido">
            <h3 className="h3-agregar">Crear nuevos productos</h3>
            <FormAgregar/>
        </div>
    </div>
    );
}

export default AgregarProductos;