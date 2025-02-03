import React, { useEffect, useState } from 'react'
import '../estilos/DetallePedidoFin.css'
import BotonVolver from '../componentes/BotonVolver';
import ScrollTop from './ScrollTop';
import ClienteService from '../servicios/ClienteService';

const DetallePedidoFin = ({ idUsuario, nombre }) => {

    const [detalle, setDetalle] = useState("");

    useEffect(() => {
        ClienteService.getBuscarPorEstadoIdcliente(2, idUsuario).then(responseBuscarEstado => {
            setDetalle(responseBuscarEstado.data[responseBuscarEstado.data.length - 1]);
           
        }).catch(error => {
            console.log(error);
        })
    }, []);


    return (
        <div>
            <ScrollTop></ScrollTop>

            <div className='card-product-container'>
                <div className='card-product'>
                    {detalle.length > 0 ? <div className='card'>
                        <h1 className='tituloPedido'>Tu pedido ya está a la orden</h1>
                        <div className='contenedorTexto'>
                            <label>Casillero: {detalle ? detalle.casillero : ""}</label>
                            <label>Fecha: {detalle ? detalle.fechaRetiraPedido : ""}</label>
                            <label>Hora: {detalle ? detalle.horaRetiraPedido : ""}</label>
                            <label>Lugar: {detalle ? detalle.lugarRetiraPedido : ""}</label>
                        </div>
                        <BotonVolver></BotonVolver>
                    </div> : "sin datos"}
                </div>
            </div>
        </div>
    )
}

export default DetallePedidoFin;
