import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const NavegacionApp = () => {
    
    const usuario = useSelector(state => state.Usuario.usuario);

    return(
        <nav className="navegacion-app-contenedor">
            { (usuario && usuario.rol === "admin")             
            ? <Link to={"/app/agregar-producto"} className="navegacion-app-opcion">
                <ion-icon name="bag-add"></ion-icon>
                <p>Agregar Producto</p>
              </Link>
            : null }
            { (usuario && usuario.rol === "admin")             
            ? <Link to={"/app/admin-productos"} className="navegacion-app-opcion">
                <ion-icon name="bag-check"></ion-icon>
                <p>Administrar Productos</p>
              </Link>
            : null }
            <Link to={"/app/pedidos"} className="navegacion-app-opcion">
                <ion-icon name="bag"></ion-icon>
                <p>Pedidos</p>
            </Link>
            { (usuario && usuario.rol === "admin")             
            ? <Link to={"/app/subcategorias"} className="navegacion-app-opcion">
                <ion-icon name="filter-circle"></ion-icon>
                <p>Subcategorias</p>
              </Link>
            : null }
            <Link to={"/app/cuenta"} className="navegacion-app-opcion">
                <ion-icon name="person"></ion-icon>
                <p>Tu cuenta</p>
            </Link>
        </nav>
    );
}

export default NavegacionApp;