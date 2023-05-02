
import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';
import imgInfo from './images/info-icon.png';
import imgConsulta from './images/consulta-icon.png';
import imgExp from './images/exp-icon.png';
import imgSignos from './images/signos-icon.png';

function InfoPsico({ id }) {




    //varoables
    let [Nombre, setNom] = useState([]);
    let [Id, setId] = useState([]);
    let [Edad, setEdad] = useState([]);
    let [Sexo, setSexo] = useState([]);
    let [AP, setAP] = useState([]);
    let [AM, setAM] = useState([]);
    //consulta
    let [motivo, setMotivo] = useState([]);
    let [objetivos, setObjetivos] = useState([]);
    let [recom, setRecom] = useState([]);


   




    useEffect(() => {
        let myID = [id];

        //Obtener info personal
        firebase.ref('/User/' + myID + '/InfoPersonal/Nombre').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setNom(snapshot.val());
            setId(myID);
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
        //Obtener el sexo
        firebase.ref('/User/' + myID + '/InfoPersonal/Sexo').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setSexo(snapshot.val());
        });

        //-----------------------------EXPEDIENTE
        
        //consultas-----------------------------------------

        firebase.ref('/Psicologia/Consultas/' + myID + '/UltimaConsulta').once('value').then((snapshot) => {
            const UC = snapshot.val();
           
            firebase.ref('/Psicologia/Consultas/' + myID + '/' + UC + '/Motivo').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setMotivo(snapshot.val());
                console.log(UC); 
            });

            firebase.ref('/Psicologia/Consultas/' + myID + '/' + UC + '/Objetivos').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setObjetivos(snapshot.val());
                console.log(); 
            });
            //Obtener el ultima
            firebase.ref('/Psicologia/Consultas/' + myID + '/' + UC + '/Recomendaciones').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setRecom(snapshot.val());
            });

            
            
        });
       



        





       



    }, [id]);




    return (
        <div className='contenedorComponenteInfoPsico'>
            <div className='cont_title_info_pacientePsico'>
                <h1>INFORMACIÓN DEL PACIENTE</h1>
            </div>
            <div className='containerTargertsPsico'>
            <div className='targetPsico' id='infoPersonalContent'>
            <div className='contTitleTargetPsico'><img className='Icons' src={imgInfo}/><h2>INFORMACIÓN</h2></div>
                <div className=''>
                <p className='titleValorPsico'>Nombre:</p>
                <p className='value'>{Nombre}&nbsp;{AP}&nbsp;{AM}</p>
                </div>
                <div className='rowItemsTargetPsico'>
                <p className='titleValorPsico'>ID de Usuario:&nbsp;</p>
                <p className='value'>{Id}</p>
                </div>
                <div className='rowItemsTargetPsico'>
                <p className='titleValorPsico'>Edad:&nbsp;</p>
                <p className='value'>{Edad} años</p>
                </div>
                <div className='rowItemsTargetPsico'>
                <p className='titleValorPsico'>Sexo:&nbsp;</p>
                <p className='value'>{Sexo}</p>
                </div>
            </div>

            <div className='targetPsico' id='ExpedienteContent'>
                
            <div className='contTitleTargetPsico'><img className='Icons' src={imgExp}/><h2>CONSULTAS</h2></div>
                
                <p className='titleValorPsico'>Motivo de la consulta:</p>
                <p className='value'>{motivo}</p>
                
               
                <p className='titleValorPsico'>Objetivos terapéuticos:</p>
                <p className='value'>{objetivos}</p>
                
                
                <p className='titleValorPsico'>Recomendaciones:</p>
                <p className='value'>{recom}</p>
               
               
                
                
            </div>

            </div>
        </div>
    );
}

export default InfoPsico;