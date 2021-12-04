import React, { Fragment } from 'react'
import Producto from './Producto';
import { useSelector } from 'react-redux';

const Productos = ({ pagina, guardarPagina }) => {

    const productos = useSelector(state => state.Producto.productos);

    const paginaAnterior = () => {
        const nuevaPagina = pagina - 1;
        if(nuevaPagina === 0) return;
        guardarPagina(nuevaPagina);
    }
    const paginaSiguiente = () => {
        const nuevaPagina = pagina + 1;
        guardarPagina(nuevaPagina);
    }

    return(
        <Fragment>
            <div className="productos-contenedor">
                { productos.length !== 0 ? productos.map(producto => <Producto key={producto._id} producto={producto}/>) : <p className="producto-no">No hay productos</p> }
            </div>
            <div className="paginas">
            { pagina === 1 
                    ? null
                    : <button onClick={() => paginaAnterior()} className="botones-paginas">
                        <ion-icon name="arrow-back"></ion-icon>
                        <p>Pagina Anterior</p>
                      </button>
                    }
                    { productos.length < 8
                    ? null
                    : <button onClick={() => paginaSiguiente()} className="botones-paginas">
                        <p>Siguiente Pagina</p>
                        <ion-icon name="arrow-forward"></ion-icon>
                      </button>
                    }
            </div>
        </Fragment>
    );
}

export default Productos;