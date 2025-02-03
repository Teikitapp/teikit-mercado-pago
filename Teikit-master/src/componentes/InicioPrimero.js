
import { Link } from 'react-router-dom';
import '../estilos/FondoInicioNaranjo.css';
import casillas from '../imagenes/casillasCelular.png';



function InicioPrimero() {
  return (    
      <div className="fondoNaranjo">      
       <div className='contenedorNaranjo'>
          <div className='texto'>
              <p >
              Ordena en segundos.
               <label>  Rápidez & Cómodidad con TEIKIT.
                 </label>
               <br/>
              
            </p>
            <Link to="/pedidos"><button  className='botonPedirAhora'>Pedir Ahora </button></Link>
          </div>
          <div className='divCasilla' >
            <img className='logoCasilla' src={casillas} alt='logo de freeCode' />
          </div>
          
        </div>     
      </div>

  );
}

export default InicioPrimero;