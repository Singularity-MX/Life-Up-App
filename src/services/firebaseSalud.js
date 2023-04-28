import firebase from "../firebase";
import { storage } from '../firebase';
import { useState, useEffect} from 'react';
import Swal from 'sweetalert2';


//---------------------------------------INSERTS DIRECTOS
//Agregar nuevo expedientes
function addNuevoPaciente(Padecimientos, Alergias, Sangre) {
   
  firebase.ref('/UltimosUsuarios/Salud').once('value').then((snapshot) => {
    const ID = snapshot.val(); //obtiene el value del ultimo user activo

    const bucket = "/Salud"; //nodo inicial
    firebase.ref(bucket+'/Expedientes'+'/'+ID+'/PadecimientosCronicos').set(Padecimientos); //Add Nombre
    firebase.ref(bucket+'/Expedientes'+'/'+ID+'/Alergias').set(Alergias); //Add Nombre
    firebase.ref(bucket+'/Expedientes'+'/'+ID+'/Sangre').set(Sangre); //Add Nombre

    addUserActive(ID); //agrega el user active
    const year = new Date().getFullYear().toString().slice(-2);//
    const month = new Date().getMonth();
    const day = new Date().getDay();
    let fecha = "";
    fecha=day +"/"+ month+"/"+ year;

    firebase.ref(bucket+'/Expedientes'+'/'+ID+'/FechaDeRegistro').set(fecha); //Add Nombre
    

  });

}


//Agregar nuevas consultas
function NuevaConsulta(temp, fc, fr, presion, sos, medic, motivo, recom, glucosa) {
   
  firebase.ref('/UltimosUsuarios/Salud').once('value').then((snapshot) => {
    const ID = snapshot.val(); //obtiene el value del ultimo user activo

    const year = new Date().getFullYear().toString().slice(-2);//
    const month = new Date().getMonth();
    const day = new Date().getDay();
    let fecha = "";
    fecha=day +"-"+ month+"-"+ year;
    const h= new Date().getHours();
    const m= new Date().getMinutes();
    const s= new Date().getSeconds();
    const hora= h+":"+m+":"+s;
    const bucket = "/Salud"; //nodo inicial
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/SignosVitales/Temperatura').set(temp); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/SignosVitales/FrecuenciaCardiaca').set(fc); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/SignosVitales/FrecuenciaRespiratoria').set(fr); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/SignosVitales/Presion').set(presion); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/SignosVitales/O2Sat').set(sos); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/SignosVitales/Medicamentos').set(medic); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/SignosVitales/Glucosa').set(glucosa); //Add Nombre

    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/ConsultaInfo/Motivo').set(motivo); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/ConsultaInfo/Recomendaciones').set(recom); //Add Nombre
    firebase.ref(bucket+'/Consultas'+'/'+fecha+'/'+ID+'/ConsultaInfo/Hora').set(hora); //Add Nombre
    
    firebase.ref(bucket+'/Expedientes'+'/'+ID+'/UltimaConsulta').set(fecha); //Add Nombre

    addUserActive(ID); //agrega el user active
    

  });

}





//Agregar usuario activo
function addUserActive(ID) {
   

  firebase.ref('/UltimosUsuarios/Salud').set(ID); //Add USER

}




//alert
function showAlertNewPacient() {
    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        html: 'Se completó el registro exitosamente. ¡Nuevo paciente!',
        showConfirmButton: false,
        timer: 1500
      })
 }


export {addNuevoPaciente, showAlertNewPacient, addUserActive, NuevaConsulta};