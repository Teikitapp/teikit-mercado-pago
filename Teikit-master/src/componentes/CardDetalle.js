import React from 'react'
import producto from "../imagenes/producto.png";
import "../estilos/CardVerDetalle.css";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'


const CardDetalle = ({ nombreComercio, allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal }) => {
    const [valorCantidad, estadoValorClick] = useState(0);
    const location = useLocation()
    const { id } = location.state
    const { nombre } = location.state
    const { valor } = location.state
    const { descripcion } = location.state

    const product = {
        id: id,
        nombre: nombre,
        valor: valor,
        descripcion: descripcion,
        quantity: valorCantidad
    }

    const agregarProducto = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: valorCantidad }
                    : item
            );
            // eslint-disable-next-line
            allProducts.map(item => {
                const iteTemporal = allProducts.find(item => item.id === product.id);
                if (iteTemporal.id === product.id && iteTemporal.quantity !== product.quantity) {
                    setCountProducts((countProducts - iteTemporal.quantity) + product.quantity)
                    setTotal((total - (product.valor * iteTemporal.quantity)) + product.valor * product.quantity)

                }

            });
            return setAllProducts([...products]);
        }

        setTotal(total + product.valor * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);

    }


    function restarYsumar(accion) {
        estadoValorClick(0)
        if (accion === "sumar") {
            estadoValorClick(valorCantidad + 1);
        } else {
            if (valorCantidad > 0) {
                estadoValorClick(valorCantidad - 1);
            }
        }
    }
    return (
        <div>


            <div className='divLogoYtexto' >
                <div className='divLogo'>
                    <img className="imagengProductoVerDetalle" src={producto} alt='logo'></img>
                </div>
                <div className='divTexto'>
                    <li className='nombreProductoVerDetalle'>{nombre}</li>
                    <li className='sectorProductoVerDetalle'>{nombreComercio}</li>
                    <li className='precioProductoVerDetalle'>${valor}</li>
                </div>
            </div>

            <div className='textoCardProductoVerDetalle'>
                <li className='textoDescripcion'>Descripción: {descripcion}</li>
            </div>


            <div className='divCantidadYboton'>
                <div className='cantidad'>
                    <label onClick={() => { restarYsumar("restar") }} className="bi bi-dash cardBotonMenos"></label>
                    <label className='textoCantidad'>{valorCantidad === 0 ? '0' : valorCantidad} </label>
                    <label onClick={() => { restarYsumar("sumar") }} className='bi bi-plus-lg cardBotonMas'></label>

                </div>

                <div className=''>
                    <Link to="/pedidos"><button className='botonVolver'>Volver</button></Link>
                    <button disabled={!valorCantidad} onClick={() => { agregarProducto(product) }} className='botonVerDetalles'>Añadir al carro</button>
                </div>
            </div>
        </div>

    )
}

export default CardDetalle
