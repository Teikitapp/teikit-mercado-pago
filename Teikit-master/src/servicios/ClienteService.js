import axios from "axios";

const CLIENTE_BASE_REST_API_URL = "http://localhost:8080/api/data/clientes";
const USUARIO_BASE_REST_API_URL = "http://localhost:8080/api/usuario/listarUsuarios";
const PAGO_BASE_REST_API_URL = "http://localhost:3001/create_preference";
const PRODUCTOS_BASE_REST_API_URL = "http://localhost:8080/api/producto/listarProductos";
const DETALLE_PEDIDO_BASE_REST_API_URL = "http://localhost:8080/api/detallePedido/ingresarDetallePedido";
const PEDIDO_BASE_REST_API_URL = "http://localhost:8080/api/pedido/ingresarPedido";
const CASILLERO_BASE_REST_API_URL = "http://localhost:8080/api/casillero/buscarCasilleroDisponible";
//const FIN_PEDIDO_BASE_REST_API_URL= "http://localhost:8080/api/pedido/buscarPedidoPorId/"


class ClienteService {
    getAllClientes(){
        return axios.get(CLIENTE_BASE_REST_API_URL);
    }

    getAllUsuarios(){
        return axios.get(USUARIO_BASE_REST_API_URL);
    }
    getAllProductos(){
        return axios.get(PRODUCTOS_BASE_REST_API_URL);
    }

    createPreference(cantidad, total, idDelPedido, casillero){
        console.log("desde el servicio");
        
        return axios.post((PAGO_BASE_REST_API_URL),{
            title:"PRUEBA TEIKIT",
            quantity:cantidad,
            price:1,
            idDelPedido:idDelPedido,
            casillero:casillero
        });
        
    } 

    enviarDetallePedido(request){              
        return axios.post((DETALLE_PEDIDO_BASE_REST_API_URL),request);
        
    } 
    enviarPedido(request){              
        return axios.post((PEDIDO_BASE_REST_API_URL),request);
        
    } 
    getCasilleroDisponible(){              
        return axios.get(CASILLERO_BASE_REST_API_URL);
        
    } 
    getBuscarPorEstadoIdcliente(status, idUsuario){
        return axios.get(`http://localhost:8080/api/pedido/buscarPedidoPorId/${status}-${idUsuario}`);
    }
    getBuscarPorDosEstadosIdcliente( idUsuario){
        return axios.get(`http://localhost:8080/api/pedido/buscarPedidoEnProcesoYlistoRetiro/${idUsuario}`);
    }
    actualizarEstadoPedido(idPedido, nuevoEstado){
        return axios.put(`http://localhost:8080/api/pedido/actualizarPedido/${idPedido}-${nuevoEstado}`);
    }
    actualizarEstadoCasillero(idCasillero, nuevoEstado){
        return axios.put(`http://localhost:8080/api/casillero/actualizarEstadoCasillero/${idCasillero}-${nuevoEstado}`);
    }
    obtenerCliente(request){              
        return axios.post((`http://localhost:8080/api/data/buscarClienteUserPass`),request);
        
    } 
    obtenerUsuario(request){              
        return axios.post((`http://localhost:8080/api/usuario/buscarUsuarioUserPass`),request);      
    } 

    obtenerComercio(request){              
        return axios.post((`http://localhost:8080/api/data/buscarClienteUserPass`),request);       
    } 

    registrarUsuario(request){              
        return axios.post((`http://localhost:8080/api/usuario/guardarUsuarios`),request);       
    } 



    // Servicios Comercios
    obtenerPedidos(idComercio){              
        return axios.get(`http://localhost:8080/api/pedido/listarPedidosYdetalle/${idComercio}`);       
    } 

}
// eslint-disable-next-line
export default new ClienteService();