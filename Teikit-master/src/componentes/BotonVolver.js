import React from 'react'
import "../estilos/CardVerDetalle.css";
import { Link } from 'react-router-dom';

function BotonVolver () {

    
  return (
    <div>
       <Link  to="/pedidos"><button className='botonAtras'>Volver</button></Link>      
    </div>
  )
}

export default BotonVolver
