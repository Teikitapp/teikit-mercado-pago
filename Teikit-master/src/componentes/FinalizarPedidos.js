import React, { useState } from 'react'
import '../estilos/FinalizarPedidos.css';
import ScrollTop from './ScrollTop';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { isWeekend } from 'date-fns';
import { Link } from 'react-router-dom';
import Header from './Header';



registerLocale("es", es);

const FinalizarPedidos = ({
  setAllProducts,
  setTotal,
  countProducts,
  setCountProducts,
  email,
  nombre,

  nombreComercio,
  allProducts,
  total,
  dia,
  mes,
  anio,
  setFechaRetiro,
  setHorarioRetiro,
}) => {

  const [fecha, setFecha] = useState(null);
  const [horaRetiro, setHoraRetiro] = useState(null);
  const diaFinMes = (dia + 8) > 30 ? dia - 22 : (dia + 8);
  const mesFinMes = (dia + 8) > 31 ? mes + 1 : mes;
  const fechaHoy = mes + "/" + dia + "/" + anio;
  const fechaHasta = mesFinMes + "/" + diaFinMes + "/" + anio;
  const minDate = new Date(fechaHoy);
  const maxDate = new Date(fechaHasta);

  const tiempoRetiroChance = (t) => {
    setHoraRetiro(t.target.value);
    setHorarioRetiro(t.target.value)

  }
  const dateChance = date => {
    setFecha(date);
    let temp = "";
    temp = date.toLocaleDateString('es-ES');
    setFechaRetiro(temp)
  }

  const isWeekendDay = (date) => {return isWeekend(date);}
  const filterWeek = (date) => {return !isWeekendDay(date)}

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

      <div className='fondoPedidos' >
        <ScrollTop />
       
        <div className='card-product-container-finalizar'>
          <div className='card-product-finalizar'>
            <div className='card-finalizar'>

              <div className='divCalendario'>

                <DatePicker
                  showIcon
                  isClearable
                  className=' pitcher fa fa-calendar'
                  placeholderText="Seleccione fecha retiro"
                  selected={fecha}
                  onChange={(date) => { allProducts.length === 0 ? dateChance("Seleccione fecha retiro") : dateChance(date) }}
                  locale="es"
                  dateFormat="dd/MM/yyyy "
                  filterDate={filterWeek}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={allProducts.length === 0}

                />

              </div>
              <div className='divSelectTiempo '>
                <select onChange={(hora) => { tiempoRetiroChance(hora) }} disabled={allProducts.length === 0} className='select-tiempo '>
                  <option >Seleccione hora retiro</option>
                  <option>10:15</option>
                  <option>10:30</option>
                  <option>10:45</option>
                  <option>11:00</option>
                </select>
              </div>
              <div className='divPagar'>
                <Link to="/pedidos"><button className='botonSeguirComprando'>Seguir comprando </button></Link>
                <Link to="/pagar"><button
                  disabled={allProducts.length === 0 || ((horaRetiro === null || horaRetiro === "Seleccione hora retiro") || fecha === null)} className='botonPagar'>ir a Pagar </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalizarPedidos;
