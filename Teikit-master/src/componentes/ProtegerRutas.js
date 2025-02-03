import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const ProtegerRutas = ({respLogin}) => {
   
    let r = respLogin === 1 ? true : null;
    const user = r;
  return user ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
  
}

export default ProtegerRutas
