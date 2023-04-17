import './Display.css';
import ejemplo from '../images/grafico_barras.png';
import React from 'react';

function Graficos() {
    return (
        <div className='container-stadistic'>

            <div className="contenedor_barras">
                <div className="content-title">
                    <h5 className="titulo">Días con más concurrencia</h5>
                </div>
                <img src={ejemplo} className='imagen_barras' />
                {/*AQUI SE GENERA EL GRAFICO DE BARRAS*/}
            </div>

            <div className='contenedor-bottom-estadisticas'>
                <div className="contenedor_botom">
                    <div className="content-title">
                        <h5 className="titulo">Sexo más activo</h5>
                    </div>
                    <img src={ejemplo} className='ejemplo' />
                    {/*AQUI SE GENERA EL GRAFICO DE pastel*/}
                </div>

                <div className="contenedor_botom">
                    <div className="content-title">
                        <h5 className="titulo">Grafico extra</h5>
                    </div>
                    <img src={ejemplo} className='ejemplo' />
                    {/*AQUI SE GENERA EL GRAFICO final*/}
                </div>
            </div>
        </div>
    );
}



export default Graficos;