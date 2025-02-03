import React from 'react'
import '../estilos/VerDetalle.css';
import CardDetalle from './CardDetalle';
//import BotonVolver from './BotonVolver';
import ScrollTop from './ScrollTop';
import Titulo from './Titulo';
import Header from './Header';
//import { useLocation } from 'react-router-dom'


const VerDetalle = ({
  email,
  nombre,

  nombreComercio,
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal }) => {

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
      <ScrollTop />
      <Titulo nombreComercio={nombreComercio} />
      <div className='contenedor'>
        <div className='formatoCardDetalle'>

          <CardDetalle
            nombreComercio={nombreComercio}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts} />
        </div>
      </div>
    </div>
  )
}

export default VerDetalle;
