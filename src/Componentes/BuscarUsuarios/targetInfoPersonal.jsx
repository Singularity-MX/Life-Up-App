
import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';
import './styleSalud.css';
import imgInfo from './images/info-icon.png';
import imgConsulta from './images/consulta-icon.png';
import imgExp from './images/exp-icon.png';
import imgSignos from './images/signos-icon.png';

function TargetPersonal({ id }) {




    //INFO PERSONAL
    let [Nombre, setNom] = useState([]);
    let [Id, setId] = useState([]);
    let [Edad, setEdad] = useState([]);
    let [Sexo, setSexo] = useState([]);
    let [AP, setAP] = useState([]);
    let [AM, setAM] = useState([]);
    let [Tel, setTel] = useState([]);
    //CONTACTO
    let [Calle, setCalle] = useState([]);
    let [Ciudad, setCiudad] = useState([]);
    let [Colonia, setColonia] = useState([]);
    let [Cp, setCp] = useState([]);
    let [Estado, setEstado] = useState([]);
    //emergencia
    let [Am, setAm] = useState([]);
    let [Ap, setAp] = useState([]);
    let [NombreCE, setNombreCE] = useState([]);
    let [Parentesco, setParentesco] = useState([]);
    let [TelCE, setTelCE] = useState([]);


    const [fechaFormateada, setFechaFormat] = useState('');



    useEffect(() => {
        let myID = [id];

        //----------------------------------Obtener info personal
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
        firebase.ref('/User/' + myID + '/InfoPersonal/Tel').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setTel(snapshot.val());
        });

        //-----------------------------CONTACTO
        firebase.ref('/User/' + myID + '/InfoContacto/Calle').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setCalle(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoContacto/Ciudad').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setCiudad(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoContacto/Cp').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setCp(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoContacto/Estado').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setEstado(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoContacto/Colonia').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setColonia(snapshot.val());
        });
    
          //-----------------------------CONTACTO DE EMERGENCIA
          firebase.ref('/User/' + myID + '/InfoEmergencia/Nombre').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setNombreCE(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoEmergencia/Ap').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setAp(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoEmergencia/Am').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setAm(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoEmergencia/Parentesco').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setParentesco(snapshot.val());
        });
        firebase.ref('/User/' + myID + '/InfoEmergencia/Tel').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setTelCE(snapshot.val());
        });











    }, [id]);




    return (
        <div className='contenedorComponenteInfo'>
            <div className='cont_title_info_paciente'>
                <h1>INFORMACIÓN PERSONAL</h1>
            </div>
            <div className='containerTargerts'>
            <div className='target' id='infoPersonalContent'>
            <div className='contTitleTarget'><img className='Icons' src={imgInfo}/><h2>INFORMACIÓN </h2></div>
                <div className=''>
                <p className='titleValor'>Nombre:</p>
                <p className='value'>{Nombre}&nbsp;{AP}&nbsp;{AM}</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>ID de Usuario:&nbsp;</p>
                <p className='value'>{Id}</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Edad:&nbsp;</p>
                <p className='value'>{Edad} años</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Sexo:&nbsp;</p>
                <p className='value'>{Sexo}</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>TELEFONO:&nbsp;</p>
                <p className='value'>{Tel}</p>
                </div>
            </div>

            <div className='target' id='ExpedienteContent'>
                
            <div className='contTitleTarget'><img className='Icons' src={imgExp}/><h2>CONTACTO</h2></div>
                
                <p className='titleValor'>Calle:</p>
                <p className='value'>{Calle}</p>
                
               
                <p className='titleValor'>Colonia:</p>
                <p className='value'>{Colonia}</p>
                
                
                <p className='titleValor'>Código postal:</p>
                <p className='value'>{Cp}</p>
               
               
                <p className='titleValor'>Ciudad:</p>
                <p className='value'>{Ciudad}</p>

                <p className='titleValor'>Estado:</p>
                <p className='value'>{Estado}</p>
                
            </div>

            <div className='target' id='ConsultaContent'>
            <div className='contTitleTarget'><img className='Icons' src={imgConsulta}/><h2>Contacto emergencia</h2></div>
            
            <p className='titleValor'>Nombre:</p>   
            <p className='value'>{NombreCE}&nbsp;{Ap}&nbsp;{Am}</p>
                
             
                
                <p className='titleValor'>Parentesco:</p>
                <p className='value'>{Parentesco}</p>
              
                
                <p className='titleValor'>Telefono:</p>
                <p className='value'>{TelCE}</p>
               
            </div>

        
            </div>
        </div>
    );
}

export default TargetPersonal;