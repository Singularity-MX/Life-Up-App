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

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {endSession, getSession, isLoggedIn} from "../session";




export function Menu(props) {
    const color = "#FFF";

    let navigate = useNavigate();

    let [email, setEmail] = useState("");
  
    useEffect(() => {
      if (!isLoggedIn()) {
        navigate("/login");
      }
  
      let session = getSession();
      setEmail(session.email);
  
      console.log("Your access token is: " + session.accessToken);
    }, [navigate]);
  
    const onLogout = () => {
      endSession();
      navigate("/loader-Login");
    }

    const addUser = () => {
      navigate("/addUserPersonal");
    }
    const ejemploADD = () => {
      navigate("/ejemplo");
    }

    const salud = () => {
      navigate("/saludDashboard");
    }
    const psicologia = () => {
      navigate("/psicologia-Dashboard");
    }
    const buscarUser = () => {
      navigate("/BuscarUsuarioHome");
    }
    const dashboardTaller = () => {
      navigate("/dashboardTaller");
    }
    const Estadis = () => {
      navigate("/EstadisticaDash");
    }
    const Home = () => {
      navigate("/loader-Home");
    }
    
    
    return (
    <div>
        <div className="containerMenu">
            <div className="Option"> 
               <img src={home} className="icon" onClick={Home}/>
            </div>
            <div className="Option">
            <img src={user} className="icon" onClick={addUser}/>
            </div>
            <div className="Option">
            <img src={buscar} className="icon" onClick={buscarUser}/>
            </div>
            <div className="Option">
            <img src={clinico} className="icon" onClick={salud}/>
            </div>
            <div className="Option">
            <img src={psico} className="icon" onClick={psicologia}/>
            </div>
            <div className="Option">
            <img src={actividad} className="icon" onClick={dashboardTaller}/>
            </div>
            <div className="Option">
            <img src={estadisticas} className="icon" alt='Estadísticas' onClick={Estadis}/>
            </div>



            <div className="Option">
            <img src={salir} className="icon" onClick={onLogout}/>
            </div>



            


        </div>
        
    </div>
    );
}

export default Menu;
