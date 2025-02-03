
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pedidos from './componentes/Pedidos';
import Home from './componentes/Home';
import VerDetalle from './componentes/VerDetalle';
import React, { useEffect, useState } from 'react'

import ClienteService from './servicios/ClienteService';
import FinalizarPedidos from './componentes/FinalizarPedidos';
import Pagar from './componentes/Pagar';
import './App.css'
import PedidosEnCurso from './componentes/PedidosEnCurso';
import Login from './componentes/Login';
import ProtegerRutas from './componentes/ProtegerRutas';
import LoginCliente from './componentes/LoginCliente';
import ProtegerRutasComercio from './componentes/ProtegerRutasComercio';
import HomeComercio from './componentes/cafeteria/HomeComercio';
import RegistrarUsuarios from './componentes/RegistrarUsuarios';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [usuario, setUsuario] = useState([]);
  const [respLogin, setRespLogin] = useState(null);
  const [respLoginComercio, setRespLoginComercio] = useState(null);
  const [cliente, setCliente] = useState('');
  const [fechaRetiro, setFechaRetiro] = useState("");
  const [horarioRetiro, setHorarioRetiro] = useState("");
  const today = new Date();
  const mes = today.getMonth() + 1;
  const anio = today.getFullYear();
  const dia = today.getDate();
  const fechaHoy = dia + "/" + mes + "/" + anio;


  useEffect(() => {
    ClienteService.getAllClientes().then(response => {
      setCliente(response.data[0]);
    }).catch(error => {
      console.log(error);
    })
  }, []);



  return (
    <div>
      <BrowserRouter>
        <div>
          {/* <Routes>
            <Route path='/registrarUsuario' element={<RegistrarUsuarios />}></Route>

            <Route path='/loginComercio' element={<LoginCliente setRespLoginComercio={setRespLoginComercio} />}></Route>
            <Route element={<ProtegerRutasComercio respLoginComercio={respLoginComercio} />}>
              <Route path='/homeComercio' element={<HomeComercio />}></Route>
            </Route>
          </Routes> */}

          <Routes>
            <Route path='/registrarUsuario' element={<RegistrarUsuarios />}></Route>

            <Route path='/loginComercio' element={<LoginCliente setRespLoginComercio={setRespLoginComercio} />}></Route>
            <Route element={<ProtegerRutasComercio respLoginComercio={respLoginComercio} />}>
              <Route path='/homeComercio' element={<HomeComercio />}></Route>
            </Route>

            <Route path='/' element={<Login />}></Route>
            <Route path='/login' element={<Login setRespLogin={setRespLogin} setUsuarios={setUsuario} />}></Route>
            <Route element={<ProtegerRutas respLogin={respLogin} />}>

              <Route path='/home' element={<Home
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                email={usuario.email}
                nombre={usuario.nombreApellido} />}></Route>

              <Route path='/pedidos' element={<Pedidos
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                email={usuario.email}
                nombre={usuario.nombreApellido}
                nombreComercio={cliente === "" || cliente === undefined ? "" : cliente.nombre} />}>
              </Route>

              <Route path='pedidos/verDetalle' element={<VerDetalle
                email={usuario.email}
                nombre={usuario.nombreApellido}
                nombreComercio={cliente === "" || cliente === undefined ? "" : cliente.nombre}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />} />

              <Route path='pedidos/verDetalle/finalizarPedido' element={<FinalizarPedidos

                setAllProducts={setAllProducts}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                email={usuario.email}
                nombre={usuario.nombreApellido}

                nombreComercio={cliente === "" || cliente === undefined ? "" : cliente.nombre} allProducts={allProducts} total={total}
                dia={dia} mes={mes} anio={anio} setFechaRetiro={setFechaRetiro} setHorarioRetiro={setHorarioRetiro}
              />}></Route>

              <Route path='/pagar' element={<Pagar

                setAllProducts={setAllProducts}

                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                email={usuario.email}
                nombre={usuario.nombreApellido}
                nombreComercio={cliente === "" || cliente === undefined ? "" : cliente.nombre} allProducts={allProducts} total={total}
                fechaHoy={fechaHoy} fechaRetiro={fechaRetiro} horarioRetiro={horarioRetiro}
                idCliente={cliente === "" || cliente === undefined ? "" : cliente.idCliente} idUsuario={cliente === "" || cliente === undefined ? "" : usuario.id}
              />}></Route>

              <Route path='/retirosPendientes' element={<PedidosEnCurso
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                email={usuario.email}
                nombre={usuario.nombreApellido}
                usuario={usuario === "" || usuario === undefined ? "" : usuario} />}></Route>
            </Route>
            {/* <Route path='/detallePedido' element={<DetallePedidoFin
              idUsuario={usuario === "" || usuario === undefined ? "" : usuario.id} nombre={usuario === "" || usuario === undefined ? "" : usuario.nombreApellido} />}></Route> */}
          </Routes>

        </div>
      </BrowserRouter>
    </div>



  );
}

export default App;
