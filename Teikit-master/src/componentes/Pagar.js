import React, { useEffect, useState } from 'react'
import '../estilos/Pagar.css'
import logoBlanco2 from '../imagenes/logoTeikit2.png'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import ClienteService from '../servicios/ClienteService';
import ScrollTop from './ScrollTop';
import Header from './Header';

const Pagar = ({
  setAllProducts,
  countProducts,
  setCountProducts,
  setTotal,
  email,
  nombre,
  nombreComercio, total, allProducts, fechaHoy, fechaRetiro, horarioRetiro, idCliente, idUsuario }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [unClick, setUnClick] = useState(false);

  initMercadoPago('APP_USR-ea0acb19-3225-4e42-8845-a528391f6cc0', { locale: "es-CL" });
  const [preferenciaId, setPreferenciaId] = useState(null);
  const handleBuy = async (idP) => {
    setUnClick(true)
    setIsLoading(true);

    console.log(total, idP, casillero);


    ClienteService.createPreference(1, total, idP, casillero).then(response => {
      const { id } = response.data;
      setPreferenciaId(id);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setIsLoading(false);

    })
  };
  const [casillero, setCasillero] = useState(null);
  useEffect(() => {
     ClienteService.getCasilleroDisponible().then(response => {     
      console.log(response.data);
      setCasillero(response.data)

    }).catch(error => {
      console.log(error);
    })
  }, []);

  const guardarPedido = async () => {

    let bodyPedido = {};
    bodyPedido = {
      "fechaIngresadoPedido": fechaHoy,
      "fechaRetiraPedido": fechaRetiro,
      "horaRetiraPedido": horarioRetiro,
      "lugarRetiraPedido": nombreComercio,
      "casillero": casillero,
      "status": 1, //en proceso
      "idUsuario": idUsuario,
      "idCliente": idCliente
    }

    ClienteService.enviarPedido(bodyPedido).then(response => {
      console.log(response);
      if (response.status === 200) {
        
        guardarDetallePedido(response.data.id);
        handleBuy(response.data.id);
      }

    }).catch(error => {
      console.log(error);
      setIsLoading(false);

    })
  }

  const guardarDetallePedido = async (idPedido) => {
    let bodyDetalle = {};
    let cantidadProductos = 0;
    for (let i = 0; i < allProducts.length; i++) {
      cantidadProductos = cantidadProductos + allProducts[i].quantity;
      bodyDetalle = {
        "cantidad": allProducts[i].quantity,
        "unitPrice": allProducts[i].valor,
        "nombreProducto": allProducts[i].nombre,
        "idUsuario": idUsuario,
        "idCliente": idCliente,
        "estadoDetallePedido": 1, //en proceso
        "idPedido": idPedido,
      }

      ClienteService.enviarDetallePedido(bodyDetalle).then(response => {
        console.log(response.data);

      }).catch(error => {
        console.log(error);
        setIsLoading(false);

      })
    }
  }

  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <label сolor='#009EE3' >Cargando...</label>
        </div>
      )
    }
  }


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
        nombre={nombre}
      />

      <div className='fondoPedidos'>
        <ScrollTop></ScrollTop>
        <div className='card-product-container'>
          <div className='card-product'>
            <div className='card'>
              <img className='' src={logoBlanco2} alt='logo' />
              <h3>Medios de Pago</h3>
              <h5>${total}</h5>
              {renderSpinner()}
              <p className='mensajeSinCasillero'>{casillero === null ? "Lo sentimos, NO tenemos casilleros disponibles para esta Cafetería" : ""}</p>
              <button disabled={allProducts.length === 0 || unClick === true} onClick={() => { guardarPedido() }} className='buttonComprar'>Continuar Pago</button>
              {casillero !== null && allProducts.length > 0 && preferenciaId && <Wallet initialization={{ preferenceId: preferenciaId }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagar
