import React from 'react'
import "../estilos/CardVerDetalle.css";
//import ClienteService from '../servicios/ClienteService';

function BotonAbrirCasillero ({pedido}) {
  console.log(pedido);
  
  // 1: EN_PROCESO, 2: PAGADO(pagado), 3: EN_CASILLERO(listo para retiro), 4:ENTREGADO
  // CASILLERO 1: DISPONIBLE, 2:OCUPADO 

  //casillero debe estar en: estado = 1 / parametros: idCasillero, 
  //pedido debe estar en: status = 4  / parametros: idUsuario, idCasillero

  //let numeroCasillero = 1;
  //let idPedido = 1;
 const abrir = () =>{
    alert("seguro que quiere abrir casillero?")
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
       <button className='botonAtras' onclick = { () => abrir()}>Abrir Casillero</button>   
    </div>
  )
}

export default BotonAbrirCasillero
