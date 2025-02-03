import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const ProtegerRutasComercio = ({respLoginComercio}) => {
   console.log("ver login de clientes:");
   
    let r = respLoginComercio === 1 ? true : null;
    const user = r;
  return user ? <Outlet></Outlet> : <Navigate to="/loginComercio"></Navigate>
  
}

export default ProtegerRutasComercio
