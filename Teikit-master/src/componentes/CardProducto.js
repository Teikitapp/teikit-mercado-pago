import React from 'react'
import producto from "../imagenes/producto.png";
import "../estilos/CardProducto.css";
import { Link } from 'react-router-dom';


const CardProducto = ({id, nombreComercio, nombre, valor, descripcion}) => {
 
    return (
        <div className='espacioEntreCard'>
            <div className='divCardProducto'>
                <img className="imgProducto" src={producto} alt='logo'></img>
                <div className='textoCardProducto'>
                    <li className='cardNombreProducto'>{nombre}</li>
                    <li className='cardPrecioProducto'>${valor} </li>
                    <li> <Link to="verDetalle" state={{ id: id, nombre: nombre, valor:valor , descripcion:descripcion}} className='cardBotonVerDetalles'>Ver detalles</Link></li>                 
                </div>
            </div>
        </div>
    )
}

export default CardProducto
