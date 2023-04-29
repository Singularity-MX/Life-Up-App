
import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';

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
        firebase.ref('/Salud/Expedientes/' + myID + '/UltimaConsulta').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setUltima(snapshot.val());
        });
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
            setUltima(snapshot.val());
        });
        //Obtener el ultima
        firebase.ref('/Salud/Expedientes/' + myID + '/PadecimientosCronicos').once('value').then((snapshot) => {
            setPad(snapshot.val());
        });




        //Oconsultas-----------------------------------------
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/ConsultaInfo/Motivo').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setMotivo(snapshot.val());
        });
        //Obtener el ultima
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/ConsultaInfo/Hora').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setHora(snapshot.val());
        });
        //Obtener el ultima
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/ConsultaInfo/Recomendaciones').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setRecomendaciones(snapshot.val());
        });





        //Obtener el ultima
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/SignosVitales/FrecuenciaCardiaca').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setFC(snapshot.val());


        });
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/SignosVitales/FrecuenciaRespiratoria').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setFR(snapshot.val());
        });
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/SignosVitales/Glucosa').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setGlucosa(snapshot.val());
        });
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/SignosVitales/Medicamenos').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setMedi(snapshot.val());
        });
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/SignosVitales/02Sat').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setSos(snapshot.val());
        });
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/SignosVitales/Presion').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setPresion(snapshot.val());
        });
        firebase.ref('/Salud/Consultas/' + myID + '/' + Ultima + '/SignosVitales/Temperatura').once('value').then((snapshot) => {
            const ID = snapshot.val();
            setTemp(snapshot.val());
        });



    }, [id]);




    return (
        <div>
            <h1>INFO PACIENTES</h1>

            <h4>Inform personal</h4>
            <p>Nombre:</p>
            <p>{Nombre}&nbsp;{AP}&nbsp;{AM}</p>
            <p>ID:</p>
            <p>{Id}</p>
            <p>Edad:</p>
            <p>{Edad} años</p>
            <p>Sexo:</p>
            <p>{Sexo}</p>

            <h4>Expediente</h4>
            <p>Alergias:</p>
            <p>{Alergias}</p>
            <p>Sangre:</p>
            <p>{Sangre}</p>
            <p>Padecimientos cronicos:</p>
            <p>{Pad}</p>
            <p>Ultima consulta:</p>
            <p>{Ultima}</p>

            <h4>Consulta</h4>
            <p>Hora:</p>
            <p>{Hora}</p>
            <p>Motivo:</p>
            <p>{Motivo}</p>
            <p>Recomendaciones:</p>
            <p>{Recomendaciones}</p>

            <h4>Signos vitales</h4>
            <p>FC:</p>
            <p>{FC}</p>
            <p>FR:</p>
            <p>{FR}</p>
            <p>Glucosa:</p>
            <p>{Glucosa}</p>
            <p>Medicamentos:</p>
            <p>{Medicamento}</p>
            <p>02Sat:</p>
            <p>{Sos}</p>
            <p>Presion:</p>
            <p>{Presion}</p>
            <p>Temperatura:</p>
            <p>{Temperatura}</p>
        </div>
    );
}

export default InfoPaciente;