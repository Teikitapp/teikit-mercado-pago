import React from 'react'
import '../estilos/FondoInicioFooter.css';

const InicioFooter = () => {
    return (
        <div className='footer'>
            <h1 className='espacioTitulo'>¿Por qué <label className='textoNaranjo'>TEIKIT</label>?</h1>
            <div className='formatoTextos'>
                <div className='col-3 posicionFija'>
                    <h1 className='textoNaranjo espacioEnteTexto'>Cómodidad</h1>
                    <p className='textoNegro'>Con Teikit olvida las filas, retira tu pedido en 
                        donde tú escojas.
                    </p>
                </div>
                <hr className='hrVertical'/>
                <div  className='col-3 posicionFija'>
                    <h1 className='textoNaranjo espacioEnteTexto'>Tiempo</h1>
                    <p className='textoNegro'>Tú comida, tú tiempo.
                        Solo escoge cuando quieres retirar, sin espera.
                    </p>
                </div>
                <hr className='hrVertical'/>
                <div  className='col-3 posicionFija'>
                    <h1 className='textoNaranjo espacioEnteTexto'>Casilleros Inteligentes</h1>
                    <p className='textoNegro'>Nuestros casilleros inteligentes
                        permiten una entrega personalizada y ajustable a tu necesidad.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InicioFooter
