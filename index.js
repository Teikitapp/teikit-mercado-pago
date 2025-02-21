import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const MERCADOPAGO_ACCESS_TOKEN = process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN;
const SUCCESS_URL = process.env.REACT_APP_SUCCESS_URL;
const FAILURE_URL = process.env.REACT_APP_FAILURE_URL;
const PENDING_URL = process.env.REACT_APP_PENDING_URL;
const NOTIFICATION_URL = process.env.REACT_APP_NOTIFICATION_URL;
const MP_API_WALLET_URL = process.env.REACT_APP_MP_API_WALLET_URL;
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
const FRONTEND_API_URL = process.env.REACT_APP_FRONTEND_API_URL;
const port = process.env.REACT_APP_PORT;

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });
const app = express();
let idCompra = null, idDelPedido = null, casillero = null;

app.use(cors({
    origin: "*", 
    methods: ['GET', 'POST'],         
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
  
app.use(express.json());

app.get("/", (req, res) => res.send("Soy el servidor"));

app.post("/create_preference", async (req, res) => {
    idDelPedido = req.body.idDelPedido;
    casillero = req.body.casillero;
    try {
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price)
            }],
            back_urls: { success: SUCCESS_URL, failure: FAILURE_URL, pending: PENDING_URL },
            notification_url: NOTIFICATION_URL
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.error("Error al crear preferencia:", error);
        res.status(500).json({ error: "Error al crear la preferencia :(" });
    }
});

app.post("/webhook", async (req, res) => {
    const paymentId = req.query.id;
    try {
        const response = await fetch(`${MP_API_WALLET_URL}/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${client.accessToken}` }
        });
        if (response.ok) {
            const data = await response.json();
            idCompra = data.id;
            serviciosPago(idCompra);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Error en webhook:", error);
        res.sendStatus(500);
    }
});

const serviciosPago = async (idCompra) => {
    try {
        const responsePedido = await fetch(`${BACKEND_API_URL}/api/pedido/actualizarPagoPedido/${idDelPedido}-${idCompra}-200`, { method: 'PUT' });
        if (responsePedido.ok) {
            const datap = await responsePedido.json();
            console.log("Pedido actualizado:", datap);
            try {
                const responseCasillero = await fetch(`${BACKEND_API_URL}/api/casillero/actualizarEstadoCasillero/${casillero}-2`, { method: 'PUT' });
                if (responseCasillero.ok) {
                    const datac = await responseCasillero.json();
                    console.log("Casillero actualizado:", datac);
                }
            } catch (error) {
                console.error("Error al actualizar casillero:", error);
            }
        }
    } catch (error) {
        console.error("Error al actualizar pedido:", error);
    }
};

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
