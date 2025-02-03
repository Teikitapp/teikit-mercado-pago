
//import producto from "../../imagenes/producto.png";
import "../../estilos/CardProductoComercio.css";
import ClienteService from '../../servicios/ClienteService';



const CardProducto = ({lista, setListaPedidos}) => {

   // console.log("desde la  card: ", lista);
   //const [newIdpedido, setnewIdpedido] = useState(0);

    const cambiaEstado = () => {   
        ClienteService.actualizarEstadoPedido(lista.id, 3).then(response => {
          console.log(response);   
          if (response.status===200) {
            ClienteService.obtenerPedidos(lista.idCliente).then(response => {  
                setListaPedidos(response.data);            
              }).catch(error => {
                console.log(error);
              })
          }      
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='espacioEntreCardComercio'>
           
            <div className='divCardProductoComercio'>
                <label className='divCasilleroComercio'>N° Casillero <h3 className='divCasillero'>{lista.casillero}</h3></label><br/>
                <label>Hora retiro: {lista.horaRetiraPedido}</label><br/>
                <label>Estado: {lista.status === 2 ? "PENDIENTE" : "LISTO PARA RETIRO"}</label>
                
                <button className='cardBotonCambiaEstado' onClick={cambiaEstado}>Cambiar a pedido listo</button>          
                   
                <div className='textoCardProductoComercio'>
               
                    <div className='ordenDiv'> 
                   
                    </div>                                   
                    {lista.dpedido.map(product => (   
                    
                            <div className='' key={product.id}>           
                                <label className=''>{product.nombreProducto} </label>                  
                                <label className='espacioIz'>{product.cantidad} </label>                                                                   
        
                        
                            </div>   
                            
                                        
                        ))}                             
                    </div>   
                    
                    
               
            </div>
        </div>
    )
}

export default CardProducto
