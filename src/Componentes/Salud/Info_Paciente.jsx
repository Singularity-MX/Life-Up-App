
import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';
import './salud.css';
import imgInfo from './images/info-icon.png';
import imgConsulta from './images/consulta-icon.png';
import imgExp from './images/exp-icon.png';
import imgSignos from './images/signos-icon.png';

function InfoPaciente({ id }) {




    //varoables
    let [Nombre, setNom] = useState([]);
    let [Id, setId] = useState([]);
    let [Edad, setEdad] = useState([]);
    let [Sexo, setSexo] = useState([]);
    let [AP, setAP] = useState([]);
    let [AM, setAM] = useState([]);
    //Expediente
    let [Alergias, setAlergias] = useState([]);
    let [Sangre, setSangre] = useState([]);
    let [Ultima, setUltima] = useState([]);
    let [Pad, setPad] = useState([]);
    //Consulta
    let [Hora, setHora] = useState([]);
    let [Motivo, setMotivo] = useState([]);
    let [Recomendaciones, setRecomendaciones] = useState([]);

    //Signos vitales
    let [FC, setFC] = useState([]);
    let [FR, setFR] = useState([]);
    let [Glucosa, setGlucosa] = useState([]);
    let [Medicamento, setMedi] = useState([]);
    let [Sos, setSos] = useState([]);
    let [Presion, setPresion] = useState([]);
    let [Temperatura, setTemp] = useState([]);

    const [fechaFormateada, setFechaFormat] = useState('');



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
        //Obtener alergias
        firebase.ref('/Salud/Expedientes/' + myID + '/Alergias').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setAlergias(snapshot.val());

        });
        //Obtener sangre
        firebase.ref('/Salud/Expedientes/' + myID + '/Sangre').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setSangre(snapshot.val());
        });
        //Obtener el ultima
       
        //Obtener el ultima
        firebase.ref('/Salud/Expedientes/' + myID + '/PadecimientosCronicos').once('value').then((snapshot) => {
            setPad(snapshot.val());
        });


        //-----------------------------consulta
        //Obtener alergias
        firebase.ref('/Salud/Expedientes/' + myID + '/Alergias').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setAlergias(snapshot.val());

        });
        //Obtener sangre
        firebase.ref('/Salud/Expedientes/' + myID + '/Sangre').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setSangre(snapshot.val());
        });
        //Obtener el ultima
        firebase.ref('/Salud/Expedientes/' + myID + '/UltimaConsulta').once('value').then((snapshot) => {
            const ID = snapshot.val();
            let f = ID.replace(/-/g, "/");
            setUltima(f);
        });
        //Obtener el ultima
        firebase.ref('/Salud/Expedientes/' + myID + '/PadecimientosCronicos').once('value').then((snapshot) => {
            setPad(snapshot.val());
        });




        //Oconsultas-----------------------------------------

        firebase.ref('/Salud/Expedientes/' + myID + '/UltimaConsulta').once('value').then((snapshot) => {
            const UC = snapshot.val();

            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/ConsultaInfo/Motivo').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setMotivo(snapshot.val());
                
            });

            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/ConsultaInfo/Motivo').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setMotivo(snapshot.val());
                console.log();
            });
            //Obtener el ultima
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/ConsultaInfo/Hora').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setHora(snapshot.val());
            });
            //Obtener el ultima
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/ConsultaInfo/Recomendaciones').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setRecomendaciones(snapshot.val());
            });

            //Obtener el ultima
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/SignosVitales/FrecuenciaCardiaca').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setFC(snapshot.val());


            });
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/SignosVitales/FrecuenciaRespiratoria').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setFR(snapshot.val());
            });
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/SignosVitales/Glucosa').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setGlucosa(snapshot.val());
            });
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/SignosVitales/Medicamentos').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setMedi(snapshot.val());
                console.log(snapshot.val());
            });
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/SignosVitales/O2Sat').once('value').then((snapshot) => {
                const ID = snapshot.val();
                
                setSos(snapshot.val());
            });
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/SignosVitales/Presion').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setPresion(snapshot.val());
            });
            firebase.ref('/Salud/Consultas/' + myID + '/' + UC + '/SignosVitales/Temperatura').once('value').then((snapshot) => {
                const ID = snapshot.val();
                setTemp(snapshot.val());
            });

        });












    }, [id]);




    return (
        <div className='contenedorComponenteInfo'>
            <div className='cont_title_info_paciente'>
                <h1>INFORMACIÓN DEL PACIENTE</h1>
            </div>
            <div className='containerTargerts'>
            <div className='target' id='infoPersonalContent'>
            <div className='contTitleTarget'><img className='Icons' src={imgInfo}/><h2>INFORMACIÓN</h2></div>
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
            </div>

            <div className='target' id='ExpedienteContent'>
                
            <div className='contTitleTarget'><img className='Icons' src={imgExp}/><h2>EXPEDIENTE</h2></div>
                
                <p className='titleValor'>Alergias:</p>
                <p className='value'>{Alergias}</p>
                
               
                <p className='titleValor'>Tipo de Sangre:</p>
                <p className='value'>{Sangre}</p>
                
                
                <p className='titleValor'>Padecimientos Crónicos:</p>
                <p className='value'>{Pad}</p>
               
               
                <p className='titleValor'>Última Consulta:</p>
                <p className='value'>{Ultima}</p>
                
            </div>

            <div className='target' id='ConsultaContent'>
            <div className='contTitleTarget'><img className='Icons' src={imgConsulta}/><h2>CONSULTA</h2></div>
                
                <p className='titleValor'>Hora de atención:&nbsp;</p>
                <p className='value'>{Hora}</p>
             
                
                <p className='titleValor'>Motivo:</p>
                <p className='value'>{Motivo}</p>
              
                
                <p className='titleValor'>Recomendaciones:</p>
                <p className='value'>{Recomendaciones}</p>
               
            </div>

            <div className='target' id='SignosVitales'>
            <div className='contTitleTarget'><img className='Icons' src={imgSignos}/><h2>SIGNOS VITALES</h2></div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Frecuencia Cardíaca:&nbsp;</p>
                <p className='value'>{FC}&nbsp;LPM</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Frecuencia Respiratoria:&nbsp;</p>
                <p className='value'>{FR}&nbsp;RPM</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Glucosa:&nbsp;</p>
                <p className='value'>{Glucosa}&nbsp;mg/dl</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Medicamentos:</p>
                <p className='value'>{Medicamento}</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>02Sat:&nbsp;</p>
                <p className='value'>{Sos}&nbsp;%</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Presion Arterial:&nbsp;</p>
                <p className='value'>{Presion}</p>
                </div>
                <div className='rowItemsTarget'>
                <p className='titleValor'>Temperatura:&nbsp;</p>
                <p className='value'>{Temperatura}&nbsp;°C</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default InfoPaciente;