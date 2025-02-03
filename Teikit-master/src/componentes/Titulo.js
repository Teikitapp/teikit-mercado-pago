import React from 'react'
import "../estilos/Pedidos.css";

const Titulo = ({nombreComercio}) => {

  return (
   
        <div className='divTitulocliente'>
                <h2 className='tituloCliente' >{nombreComercio }</h2>
            </div>
  )
}

export default Titulo
