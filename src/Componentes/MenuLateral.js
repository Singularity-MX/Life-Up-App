import logo from '../Componentes/images/lifeUp.svg';
import '../Componentes/Menu.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fal, faHome } from '@fortawesome/free-solid-svg-icons';

import home from './images/icons/home.svg';
import user from './images/icons/user.svg';
import buscar from './images/icons/lupa.svg';
import clinico from './images/icons/clinico.svg';
import psico from './images/icons/psicologico.svg';
import actividad from './images/icons/actividad.svg';
import estadisticas from './images/icons/estadisticas.svg';
import salir from './images/icons/exit.svg';

export function Menu(props) {
    const color = "#FFF";


    return (
    <div>
        <div className="containerMenu">
            <div className="Option"> 
               <img src={home} className="icon"/>
            </div>
            <div className="Option">
            <img src={user} className="icon"/>
            </div>
            <div className="Option">
            <img src={buscar} className="icon"/>
            </div>
            <div className="Option">
            <img src={clinico} className="icon"/>
            </div>
            <div className="Option">
            <img src={psico} className="icon"/>
            </div>
            <div className="Option">
            <img src={actividad} className="icon"/>
            </div>
            <div className="Option">
            <img src={estadisticas} className="icon" alt='Estadísticas'/>
            </div>



            <div className="Option">
            <img src={salir} className="icon"/>
            </div>



            


        </div>
        
    </div>
    );
}

export default Menu;
