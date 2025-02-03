import React, { useEffect, useState } from 'react'
import ScrollTop from './ScrollTop'
import ClienteService from '../servicios/ClienteService';
import '../estilos/DetallePedidoFin.css';
import {Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Button} from "reactstrap"
import Header from './Header';

const PedidosEnCurso = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  nombreApellido,
  email,
    usuario}) => {
    const [detalle, setDetalle] = useState([]);
    const [abierto, setAbierto] = useState(false);
    const [modalEnPreparacion, setModalEnPreparacion] = useState(false);  
    const [newNpedido, setnewNpedido] = useState(0);
    const [newNcasillero, setnewNcasillero] = useState(0);
    const reload = document.getElementById("reload");

        useEffect(() => {
            if (usuario.id !== null && usuario.id !== undefined) {
                ClienteService.getBuscarPorDosEstadosIdcliente(usuario.id).then(responseBuscarEstado => {
                   return setDetalle(responseBuscarEstado.data);
                    //console.log(responseBuscarEstado.data);
                    
                }).catch(error => {
                    console.log(error);
                })
            }
        }, []); 

      // 1: EN_PROCESO, 2: PAGADO(pagado), 3: EN_CASILLERO(listo para retiro), 4:ENTREGADO
  // CASILLERO 1: DISPONIBLE, 2:OCUPADO 


 const abrir = (nCasillero, nPedido, estadoPedido) =>{
    console.log(nCasillero,nPedido);
    setnewNpedido(nPedido);
    setnewNcasillero(nCasillero);
    if (estadoPedido === 2) {
        setModalEnPreparacion(true);
    }else if (estadoPedido === 3){
        setAbierto(true);
    }
    
    //alert("seguro que quiere abrir casillero?")
 } 
 const confirmaAbrir = async() => {
    //console.log("confirmaAbrir: ",nCasillero,idPedido, newNpedido,newNcasillero);
    
    ClienteService.actualizarEstadoCasillero(newNcasillero, 1 ).then(R =>{
        console.log("actualizarEstadoCasillero: ",R.data);
      });

    ClienteService.actualizarEstadoPedido(newNpedido, 4).then(responseActualizar => {
        console.log("actualizarEstadoPedido: ",responseActualizar.data);
    }) 

    window.location.reload(false);
    setAbierto(false);
 }
 const cerrarConfirmar = () =>{
    //console.log(nCasillero,nPedido);
    setAbierto(false);
    setModalEnPreparacion(false);
   
 } 


/*  const confirmaAbrir = async() =>{
  ClienteService.actualizarEstadoCasillero(numeroCasillero, 1 ).then(R =>{
    console.log("actualizarEstadoCasillero: ",R.data);
  });

  ClienteService.actualizarEstadoPedido(idPedido, 4).then(responseActualizar => {
    console.log("actualizarEstadoPedido: ",responseActualizar.data);
  })
 } */

    return (
        <div>  
        <Header 
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
          email={email}
          nombre={nombreApellido}
        />
        <div className='fondoPedidos'>
            <ScrollTop></ScrollTop>

            <div className='card-product-container' id="reload">
                <div className='card-product'>
                    <div className='card'>
                        <h1 className='tituloPedido'>Retiros pendientes</h1>
                                
                        {detalle.length > 0 ? detalle.map(d => (
                        <div className='card' key={d.id}>
                            <div className='contenedorTexto'>
                                <label>Casillero: {d.casillero}</label>
                                <label>Fecha Retiro: {d.fechaRetiraPedido}</label>
                                <label>Hora: {d.horaRetiraPedido}</label>
                                <label>Lugar: {d.lugarRetiraPedido}</label>
                            </div>

                            <div>
                              <button className='botonAtras' onClick = {() => abrir(d.casillero, d.id, d.status)}>Abrir Casillero</button>   
                            
                                <Modal isOpen={abierto}>
                                    <ModalHeader>
                                        Confirmación 
                                    </ModalHeader>

                                    <ModalBody>
                                        <FormGroup>
                                            <Label for='usuario'><h4>¿Está seguro que desea abrir casillero N°{newNcasillero}?</h4></Label>
                                            <br/>
                                            <div className='divConfirmacion'>
                                            <Button className='botonAceptar' onClick={() => confirmaAbrir()}>Aceptar</Button>
                                            <Button className='botonRechazar'  onClick={() => cerrarConfirmar()} >Rechazar</Button>
                                            </div>
                                            
                                        </FormGroup>

                                    </ModalBody>

                                    <ModalFooter>

                                    </ModalFooter>
                                </Modal>

                                <Modal isOpen={modalEnPreparacion}>
                                    <ModalHeader>
                                        Aviso 
                                    </ModalHeader>

                                    <ModalBody>
                                        <FormGroup>
                                            <Label for='usuario'><h4>Su pedido del casillero N°{newNcasillero} aun no se encuentra listo para su retiro.</h4></Label>
                                            <br/>
                                            <div className='divConfirmacion'>
                                            
                                            <Button className='botonRechazar'  onClick={() => cerrarConfirmar()} >Cerrar</Button>
                                            </div>
                                            
                                        </FormGroup>

                                    </ModalBody>

                                    <ModalFooter>

                                    </ModalFooter>
                                </Modal>
                            </div>

                        </div>
                         )) : <h1 className='sinPedidos'>No tienes pedidos pendientes.</h1> }
                        
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
    )
}

export default PedidosEnCurso
