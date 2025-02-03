import React from 'react'
import Footer from './Footer';
import InicioPrimero from './InicioPrimero';
import InicioSegundo from './InicioSegundo';
import ScrollTop from './ScrollTop';
import Header from './Header';

const Home = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  email,
  nombre

}) => {
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
        <ScrollTop/>
        <InicioPrimero />
        <InicioSegundo />
        <Footer /> 
    </div>
  )
}

export default Home
