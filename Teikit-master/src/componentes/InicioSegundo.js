import React from 'react'
import '../estilos/FondoInicioVerComo.css';
import celular2 from '../imagenes/celular2.png';


const InicioSegundo = () => {
  return (

    <div className='contenedorDelMedio'>
      <img className='imagenCelular' src={celular2} alt='logo de freeCode' />
      <div className='textoDelMedio'>
        <p> Únete al cambio en que recibes tus
          <br />
          <label>
            pedidos
          </label>
        </p>
        <button className='botonVerComo'>Ver Cómo</button>
      </div>
    </div>
  )
}

export default InicioSegundo
