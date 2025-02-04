import express from "express";
import cors from "cors";




import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken:"APP_USR-2008863774002974-110715-f9bcd308ec67992ec10ee3577c8c267d-2081909915",
})

const app = express();
const port = 3001;
let idCompra = null;
let idDelPedido = null;
let casillero = null;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Soy el server");
})
//auto_return: "appoved",

app.post("/create_preference", async (req, res) => {
    console.log(req.body);
    idDelPedido = req.body.idDelPedido;
    casillero = req.body.casillero;
    try{
        const body = {
            items:[
                {
                    title:req.body.title,
                    quantity:Number(req.body.quantity),
                    unit_price:Number(req.body.price)
              

                }               
            ],
            back_urls:{
                success:"http://localhost:3000/login",
                failure:"http://localhost:3000/login",
                pending:"http://localhost:3000/login"
            },
            notification_url: "https://3bd5-45-238-155-49.ngrok-free.app/webhook"
            
        };
        const preference = new Preference(client);
        const result = await preference.create({body});
        console.log("body:", body);
        
        res.json({
            id:result.id,
        });
    }catch (error){
        console.log(error);
        res.status(500).json({
            error:"error al crear la preferencia :(",
        });       
    }
});

app.post("/webhook", async function (req, res) {
   const paymentId = req.query.id
     //console.log({paymentId});
   
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
       // console.log("respuesta ok---->",response);
        if (response.ok) {
            const data = await response.json();
            //console.log(data);  
            //console.log(data.id); 
            idCompra = data.id;
            console.log("idCompra---->",data.id);

            serviciosPago(idCompra);
           
            
        }
        res.sendStatus(200);
        //console.log("DATOS VARIABLES ACTUALIZAR: ", idDelPedido, idCompra );

       

       
    } catch (error) {
        console.log("error: " , error);
        res.sendStatus(500)
    }
    
})

const  serviciosPago = async (idCompra) => {
    try{
        const responsePedido = await fetch(`http://localhost:8080/api/pedido/actualizarPagoPedido/${idDelPedido}-${idCompra}-${200}`,{
            method:'PUT'
            
        })
        if (responsePedido) {
        const datap = await responsePedido.json(); 
        console.log("Pedido ok-->: ",datap);

        try {
            const responseCasillero= await fetch(`http://localhost:8080/api/casillero/actualizarEstadoCasillero/${casillero}-${2}`,{
                method:'PUT'                   
            })
            if (responseCasillero) {
            const datac = await responseCasillero.json(); 
            console.log("Casillero ok-->: ",datac);
            
            }
        } catch (error) {
            console.log("ERROR casillero -->: ");
        
        }

        
        }

    }catch(error){
        console.log("ERROR Pedido -->: ");
       
    }
} 

app.listen(port,() =>{
    console.log('el servidor esta corriendo en el puerto',{port});
    
})
