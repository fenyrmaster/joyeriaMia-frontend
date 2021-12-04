import React, { Fragment, useEffect, useState } from 'react';
import NavegacionApp from './NavegacionApp';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPedidosAPI, obtenerPedidosAdmin, obtenerUnPedido } from '../actions/pedidoAction';
import { recordarUsuario } from '../actions/usuarioAction';
import Pedido from './Pedido';
import PedidoAdmin from './PedidoAdmin';
import Spinner from './Spinner';

const Pedidos = () => {

    const dispatch = useDispatch();
    const usuario = useSelector(state => state.Usuario.usuario);
    const pedidos = useSelector(state => state.Pedido.pedidos);
    const pedidosAdmin = useSelector(state => state.Pedido.pedidosAdmin);
    const cargando = useSelector(state => state.Pedido.cargando);
    const [ codigo, guardarCodigo ] = useState("");
    const [ pagina, guardarPagina ] = useState(1);
    const [ solo, guardarSolo ] = useState(false);

    useEffect(() => {
        const productotitulo = document.querySelector(".navegacion");
        productotitulo.scrollIntoView();
        dispatch(recordarUsuario());
    }, []);
    //useEffect(() => {
    //    if(!usuario){
    //        dispatch(recordarUsuario());
    //    }
    //}, []);
    useEffect(() => {
        if(usuario && usuario.rol === "cliente"){
            dispatch(obtenerPedidosAPI(usuario._id, pagina));
            const productotitulo = document.querySelector(".navegacion");
            productotitulo.scrollIntoView();
        } else if(usuario && usuario.rol === "admin"){
            dispatch(obtenerPedidosAdmin(pagina));
            const productotitulo = document.querySelector(".navegacion");
            productotitulo.scrollIntoView();
        }
    }, [pagina, usuario]);

    const paginaAnterior = () => {
        const nuevaPagina = pagina - 1;
        if(nuevaPagina === 0) return;
        guardarPagina(nuevaPagina);
    }
    const paginaSiguiente = () => {
        const nuevaPagina = pagina + 1;
        guardarPagina(nuevaPagina);
    }
    const buscarCodigo = e => {
        e.preventDefault();
        guardarSolo(true);
        dispatch(obtenerUnPedido(codigo, guardarPagina, guardarSolo));
    }

    return(
        <Fragment>
            <div className="app-contenedor">
                <NavegacionApp/>
                <div className="contenido">
                    { (usuario && usuario.rol === "admin") 
                    ? <div className="filtros-admin filtro-pedido">
                        <form onSubmit={e => buscarCodigo(e)} className="form-agregar codigo-form">
                            <div className="input-app">
                                <label htmlFor="codigo">Codigo:</label>
                                <input onChange={e => guardarCodigo(e.target.value)} className="input-app-campo" type="text" id="codigo"/>
                            </div>
                            <button className="btn btn-orange"><span className="btn-texto">Buscar</span></button>
                        </form>
                      </div>
                    : null
                    }
                    { cargando ? <Spinner/> :
                        <Fragment>
                            { (pedidos.length !== 0 && usuario && usuario.rol === "cliente") ? pedidos.map(pedido => <Pedido pedido={pedido} key={pedido._id}/>) : null }
                            { (pedidos.length === 0 && usuario && usuario.rol === "cliente") ? <p className="producto-no">No hay pedidos</p> : null }
                            { (pedidosAdmin.length === 0 && usuario && usuario.rol === "admin") ? <p className="producto-no">No hay pedidos</p> : null }
                            { (pedidosAdmin.length !== 0 && usuario && usuario.rol === "admin") ? pedidosAdmin.map(pedido => <PedidoAdmin pedido={pedido} key={pedido._id}/>) : null }
                        </Fragment>
                    }
                    {(usuario && usuario.rol === "cliente")
                    ?<div className="paginas paginas-admin">
                        { pagina === 1 
                        ? null
                        : <button onClick={() => paginaAnterior()} className="botones-paginas">
                            <ion-icon name="arrow-back"></ion-icon>
                            <p>Pagina Anterior</p>
                          </button>
                        }
                        { pedidos.length < 2
                        ? null
                        : <button onClick={() => paginaSiguiente()} className="botones-paginas">
                            <p>Siguiente Pagina</p>
                            <ion-icon name="arrow-forward"></ion-icon>
                          </button>
                        }
                      </div>
                    : <div className="paginas paginas-admin">
                    { (pagina === 1 || solo) 
                    ? null
                    : <button onClick={() => paginaAnterior()} className="botones-paginas">
                        <ion-icon name="arrow-back"></ion-icon>
                        <p>Pagina Anterior</p>
                      </button>
                    }
                    { (pedidosAdmin.length < 2 || solo)
                    ? null
                    : <button onClick={() => paginaSiguiente()} className="botones-paginas">
                        <p>Siguiente Pagina</p>
                        <ion-icon name="arrow-forward"></ion-icon>
                      </button>
                    }
                  </div>} 
                </div>
            </div>
        </Fragment>
    );
}

export default Pedidos;