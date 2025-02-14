import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-2008863774002974-110715-f9bcd308ec67992ec10ee3577c8c267d-2081909915",
});

const app = express();
const port = 3001;
let idCompra = null;
let idDelPedido = null;
let casillero = null;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el servidor");
});

app.post("/create_preference", async (req, res) => {
    console.log(req.body);
    idDelPedido = req.body.idDelPedido;
    casillero = req.body.casillero;
    try {
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price)
            }],
            back_urls: {
                success: "https://www.teikit.cl/login",
                failure: "https://www.teikit.cl/login",
                pending: "https://www.teikit.cl/login"
            },
            notification_url: "https://3bd5-45-238-155-49.ngrok-free.app/webhook"
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        console.log("body:", body);

        res.json({ id: result.id });
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        res.status(500).json({ error: "Error al crear la preferencia :(" });
    }
});

app.post("/webhook", async (req, res) => {
    const paymentId = req.query.id;
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${client.accessToken}` }
        });
        if (response.ok) {
            const data = await response.json();
            idCompra = data.id;
            console.log("idCompra:", data.id);
            await serviciosPago(idCompra);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Error en webhook:", error);
        res.sendStatus(500);
    }
});

const serviciosPago = async (idCompra) => {
    try {
        const responsePedido = await fetch(`https://api.teikit.cl/api/pedido/actualizarPagoPedido/${idDelPedido}-${idCompra}-200`, {
            method: 'PUT'
        });
        if (responsePedido.ok) {
            const datap = await responsePedido.json();
            console.log("Pedido actualizado:", datap);
            try {
                const responseCasillero = await fetch(`https://api.teikit.cl/api/casillero/actualizarEstadoCasillero/${casillero}-2`, {
                    method: 'PUT'
                });
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
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
