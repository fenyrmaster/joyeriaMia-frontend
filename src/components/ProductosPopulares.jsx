import React from 'react'
import Producto from './Producto';
import { useSelector, useDispatch } from 'react-redux';

const ProductosPopulares = () => {

    const productos = useSelector(state => state.Producto.productos);

    return(
        <div className="productosPopulares-contenedor">
            { productos.length !== 0 ? productos.map(producto => <Producto key={producto._id} producto={producto}/>) : <p className="producto-no">No hay productos</p> }
        </div>
    )
}

export default ProductosPopulares;