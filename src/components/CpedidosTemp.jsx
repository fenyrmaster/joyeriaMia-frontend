import React, { useEffect } from 'react';
import { crearPedido } from "../actions/pedidoAction";
import { useParams, useHistory } from "react-router";
import { useDispatch } from "react-redux";

const CpedidosTemp = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch(crearPedido(id, history));
    }, []);

    return(
        <h1>Esto es temporal</h1>
    )
}

export default CpedidosTemp;