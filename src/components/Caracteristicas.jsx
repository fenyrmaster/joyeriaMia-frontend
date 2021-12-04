import React from 'react'
import Hero from "../img/Hero-compress.png"
import { Link } from 'react-router-dom'

const Caracteristicas = () => {
    return(
        <div className="contenedor-caracteristicas" style={{backgroundImage: `url(${Hero})`}}>
            <div className="caracteristicas caracteristicas-oro">
                <h2 className="joyas-title">Joyas de oro</h2>
                <ion-icon className="joya-oro" name="diamond"></ion-icon>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, soluta? Quos esse ullam aspernatur aperiam reprehenderit minima odit deleniti.</p>
                <Link className="btn btn-pink" to="/tienda"><span className="btn-texto">Ver en la tienda</span></Link>
            </div>
            <div className="caracteristicas caracteristicas-plata">
                <h2 className="joyas-title">Joyas de plata</h2>
                <ion-icon className="joya-plata" name="diamond"></ion-icon>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, soluta? Quos esse ullam aspernatur aperiam reprehenderit minima odit deleniti.</p>
                <Link className="btn btn-pink" to="/tienda"><span className="btn-texto">Ver en la tienda</span></Link>
            </div>
            <div className="caracteristicas caracteristicas-catalogo">
                <h2 className="joyas-title">Catalogos</h2>
                <ion-icon className="joya-catalogo" name="documents"></ion-icon>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, soluta? Quos esse ullam aspernatur aperiam reprehenderit minima odit deleniti.</p>
                <Link className="btn btn-pink" to="/tienda"><span className="btn-texto">Ver en la tienda</span></Link>
            </div>
        </div>
    );
}

export default Caracteristicas;