import './Display.css';
import general from '../images/Home/general.png';
import React from 'react';
import phil from '../images/Home/phil.png';

import medico from '../images/Home/medico.png';
import psicp from '../images/Home/psicologia.png';
import taller from '../images/Home/talleres.png';
import {useEffect, useState} from "react";
import {obtenerDatosDeFirebase} from '../../services/firebaseHome';
import {useNavigate} from "react-router-dom";
import firebase from "../../firebase";

const User = () => {

    const [datos, setDatos] = useState(null);

    let [Nombre, setNom] = useState([]);
    let [Id, setId] = useState([]);
    let [Edad, setEdad] = useState([]);
    let [Asistencia, setAsistencia] = useState([]);
    let [AP, setAP] = useState([]);
    let [AM, setAM] = useState([]);
    let [myID, setID] = useState([]);

    let [UltimaAsistenciaSalud, setConsultaSalud] = useState([]);
    let [MotivoSalud, setMotivoSalud] = useState([]);

    let [UltimaAsistenciaPsico, setUltimaAsistenciaPsico] = useState([]);
    let [MotivoPsico, setMotivoPsico] = useState([]); 

   
    useEffect(() => {
        
        firebase.ref('/UltimosUsuarios/UserAdd').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setID(snapshot.val());
          
        });
         //----------------------------------Obtener info personal
         firebase.ref('/User/' + myID + '/InfoPersonal/Nombre').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setNom(snapshot.val());
           
        }); 
        //Obtener el ap
        firebase.ref('/User/' + myID + '/InfoPersonal/AP').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setAP(snapshot.val());

        });
        //Obtener el am
        firebase.ref('/User/' + myID + '/InfoPersonal/AM').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setAM(snapshot.val());

        });
        //Obtener el edad
        firebase.ref('/User/' + myID + '/InfoPersonal/Edad').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setEdad(snapshot.val());
        });

          //Obtener el edad
          firebase.ref('/User/' + myID + '/UltimaAsistencia').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setAsistencia(snapshot.val());
        });


             //Obtener el edad
             firebase.ref('/Salud/Expedientes/' + myID + '/UltimaConsulta').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setConsultaSalud(snapshot.val());
                
            });
             //Obtener el edad
             firebase.ref('/Salud/Consultas/' + myID + '/'+UltimaAsistenciaSalud+'/ConsultaInfo/Motivo').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setMotivoSalud(snapshot.val());
                
            });


              //Obtener el edad
              firebase.ref('/Psicologia/Consultas/' + myID + '/UltimaConsulta').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setUltimaAsistenciaPsico(snapshot.val());
            });
             //Obtener el edad
             firebase.ref('/Psicologia/Consultas/' + myID + '/'+ UltimaAsistenciaPsico+'/Motivo').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setMotivoPsico(snapshot.val());
            });

    }, []);


    return (
        <div className='container-info'>
            {/* Aqui es el panel derecho de la info de usuario */}
            <div className="content-title">
                <h5 className="titulo">Último registro realizado</h5>
            </div>

            <div className='conainer_header_user'>
                <div className='title-header'>
                    <img src={general} className='icon_info' />
                    <h3 className='title_user'>Información general</h3>
                </div>

                <div className='buttons-header'>
                    <div class="container-input">
                        <input type="text" placeholder="Usuario" name="text" class="input-home" />
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <button className='btn-buscar'>Buscar</button>
                </div>
            </div>

            <div className='container_info_user'>
                <img src={phil} className='IMG_USER' />
                <div className='info_value'>
                    <h1 className='titulo_nombre'>{Nombre}&nbsp;{AP}&nbsp;{AM}</h1>
                    <p className='txt_user_general'>Última asistencia: {Asistencia}</p>
                    <p className='txt_user_general'>Usuario: {myID}</p>
                    <p className='txt_user_general'>Edad: {Edad} años</p>
                  
                </div>
            </div>

            <div className='container_info_adicional'>
                <div className='card_container'>
                    <div className='title_card'>
                        <img src={medico} className='icon_info' />
                        <h3 className='title_user'>Información general</h3>
                    </div>
                    <div className='card_info'>
                        <h3 className='title_card_info'>Última visita:</h3>
                        <p className='txt_card'>{UltimaAsistenciaSalud}</p>
                        <h3 className='title_card_info'>Motivo:</h3>
                        <p className='txt_card'>{MotivoSalud}</p>
                    </div>
                </div>

                <div className='card_container'>
                    <div className='title_card'>
                        <img src={psicp} className='icon_info' />
                        <h3 className='title_user'>Información general</h3>
                    </div>
                    <div className='card_info'>
                        <h3 className='title_card_info'>Última visita:</h3>
                        <p className='txt_card'>{UltimaAsistenciaPsico}</p>
                        <h3 className='title_card_info'>Motivo general:</h3>
                        <p className='txt_card'>{MotivoPsico}</p>
                    </div>
                </div>


                <div className='card_container'>
                    <div className='title_card'>
                        <img src={taller} className='icon_info' />
                        <h3 className='title_user'>Información general</h3>
                    </div>
                    <div className='card_info'>
                        <h3 className='title_card_info'>Última visita:</h3>
                        <p className='txt_card'>12/02/2023</p>
                        <h3 className='title_card_info'>Padecimientos crónicos:</h3>
                        <p className='txt_card'>Hipertensión</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default User;