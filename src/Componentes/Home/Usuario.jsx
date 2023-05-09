import './Display.css';
import general from '../images/Home/general.png';
import React from 'react';
import phil from '../images/Home/phil.png';

import medico from '../images/Home/medico.png';
import psicp from '../images/Home/psicologia.png';
import taller from '../images/Home/talleres.png';
import { useEffect, useState } from "react";
import { obtenerDatosDeFirebase } from '../../services/firebaseHome';
import { useNavigate } from "react-router-dom";
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
    let [Taller, setTaller] = useState([]);
    let [URL_IMG, setURL] = useState([]);

    let [MS, setMS] = useState([]);

    function cargarDatos(ID_user) {
        //cargar foto

        //cargar foto
        firebase.ref('/ImagesReferences/' + ID_user).once('value').then((snapshot) => {
            setURL(snapshot.val());
        });

        //----------------------------------Obtener nombre
        firebase.ref('/User/' + ID_user + '/InfoPersonal/Nombre').once('value').then((snapshot) => {
            setNom(snapshot.val());
        });
        //Obtener el apellido paterno
        firebase.ref('/User/' + ID_user + '/InfoPersonal/AP').once('value').then((snapshot) => {
            setAP(snapshot.val());

        });
        //Obtener el apellido materno
        firebase.ref('/User/' + ID_user + '/InfoPersonal/AM').once('value').then((snapshot) => {
            setAM(snapshot.val());

        });
        //Obtener el edad
        firebase.ref('/User/' + ID_user + '/InfoPersonal/Edad').once('value').then((snapshot) => {
            setEdad(snapshot.val());
        });
        //Obtener  ultima asistencia
        firebase.ref('/User/' + ID_user + '/UltimaAsistencia').once('value').then((snapshot) => {
            let nuevaAsistencia = snapshot.val().replace(/-/g, "/");
            setAsistencia(snapshot.val());
        });
        //---------------------------------------------------------------SALUD
        //Obtener la ultima consulta de salud
        firebase.ref('/Salud/Expedientes/' + ID_user + '/UltimaConsulta').once('value').then((snapshot) => {
            let nuevaAsistencia = snapshot.val().replace(/-/g, "/");
            setConsultaSalud(snapshot.val());
            ObtenerMotivoSalud(ID_user, snapshot.val());
        });
       
        //-----------------------------------------------------------------PSICOLOGIA

        //Obtener la fecha de psico
        firebase.ref('/Psicologia/Consultas/' + ID_user + '/UltimaConsulta').once('value').then((snapshot) => {
            const ID = snapshot.val();
            let nuevaAsistencia = snapshot.val().replace(/-/g, "/");
            setUltimaAsistenciaPsico(snapshot.val());
            ObtenerMotivoPsico(ID_user,snapshot.val() );
        });
       

//---------------------------------------------------------------------Talleres
        //Obtener taller
        firebase.ref('/User/' + ID_user + '/UltimoTaller').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setTaller(snapshot.val());
        });
    }

    function ObtenerMotivoSalud(id, ultimaFecha){
         //Obtener el motivo de consulta de salud
         firebase.ref('/Salud/Consultas/' + id + '/' + ultimaFecha + '/ConsultaInfo/Motivo').once('value').then((snapshot) => {
            setMotivoSalud(snapshot.val());
        });
    }

    function ObtenerMotivoPsico(id, ultimaFecha){
        //Obtener el motivo psico
        firebase.ref('/Psicologia/Consultas/' + id + '/' + ultimaFecha + '/Motivo').once('value').then((snapshot) => {

            setMotivoPsico(snapshot.val());
        });
   }


    useEffect(() => {

        firebase.ref('/UltimosUsuarios/UserAdd').once('value').then((snapshot) => {
            setID(snapshot.val());

            //cargar la información del usuario
            cargarDatos(snapshot.val());
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
                <img src={URL_IMG} className='IMG_USER' />
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
                        <h3 className='title_user'>Información Médica</h3>
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
                        <h3 className='title_user'>Información Psicológica</h3>
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
                        <h3 className='title_user'>Talleres y actividades</h3>
                    </div>
                    <div className='card_info'>
                        <h3 className='title_card_info'>Última visita:</h3>
                        <p className='txt_card'>{Asistencia}</p>
                        <h3 className='title_card_info'>Último Taller Asistido:</h3>
                        <p className='txt_card'>{Taller}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default User;