import React, { useEffect, useState } from 'react'
import CardProductosComercio from '../cafeteria/CardProductosComercio';
import logoCafeteria from "../../imagenes/logoCafeteria.png";
import { useNavigate } from 'react-router';
import ClienteService from '../../servicios/ClienteService';
import "../../estilos/HomeComercio.css";


const HomeComercio = () => {

  const [listaPedidos, setListaPedidos] = useState([]);
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let fechaHoy = date + "-" + month + "-" + year;
  const navigate = useNavigate();
  const salir = () => {
    navigate("/loginComercio");
  }


  useEffect(() => {
    ClienteService.obtenerPedidos(1).then(response => {
      console.log("RESPONSE: ", response);
      setListaPedidos(response.data);
    }).catch(error => {
      console.log(error);
    })


  }, []);

  return (
    <div className='divComercio'>
      <div>
       <img className="imgComercio" src={logoCafeteria} alt='logo'></img>
      </div>
      <div className='divButton'>
      <button className='cardBotonSalir' onClick={salir}>Cerrar sesión</button>
      </div>
      <div className='divFecha'><h1>Día: {fechaHoy}</h1></div>
      <div className='divCardTodosProductos'>
        {listaPedidos.map(product => (
          <div className='formatoCard' key={product.id}>
            <CardProductosComercio lista={product} setListaPedidos={setListaPedidos} />
          </div>
        ))}
      </div>
      {/* {listaPedidos.length === 0 || listaPedidos.status !== 200? <h1>SIN PEDIDOS PARA REALIZAR</h1> : listaPedidos} */}
      /*probando*/
    </div>

  )
}

export default HomeComercio