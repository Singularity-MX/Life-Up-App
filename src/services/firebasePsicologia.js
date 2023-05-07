import firebase from "../firebase";
import { storage } from '../firebase';
import { useState, useEffect} from 'react';
import Swal from 'sweetalert2';



//Agregar usuario activo
function addUserActive(ID) {
   

    firebase.ref('/UltimosUsuarios/Psicologia').set(ID); //Add USER
  
  }

 //Agregar nuevas consultas
function NuevaConsulta(motivo, objetivos, recom) {
   
    firebase.ref('/UltimosUsuarios/Psicologia').once('value').then((snapshot) => {
      const ID = snapshot.val(); //obtiene el value del ultimo user activo
  
      const year = new Date().getFullYear().toString().slice(-2);//
      const month = new Date().getMonth();
      const day = new Date().getDate();
      let fecha = "";
      fecha=day +"-"+ month+"-"+ year;
      const h= new Date().getHours();
      const m= new Date().getMinutes();
      const s= new Date().getSeconds();
      const hora= h+":"+m+":"+s;
      const bucket = "/Psicologia"; //nodo inicial
      firebase.ref(bucket+'/Consultas'+'/'+ID+'/'+fecha+'/Motivo').set(motivo); //Add Nombre
      firebase.ref(bucket+'/Consultas'+'/'+ID+'/'+fecha+'/Objetivos').set(objetivos); //Add Nombre
      firebase.ref(bucket+'/Consultas'+'/'+ID+'/'+fecha+'/Recomendaciones').set(recom); //Add Nombre
      firebase.ref(bucket+'/Consultas'+'/'+ID+'/UltimaConsulta').set(fecha); //Add Nombre


      
      //agrega la ultima consulta
      firebase.ref('/User/'+ID+'/UltimaAsistencia').set(fecha); //-----> ultima asistencia
      addUserActive(ID); //agrega el user active
      showAlertNewConsult();
  
    });
  
  }
  function showAlertNewConsult() {
    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        html: 'Se completó el registro exitosamente. ¡Nuevo paciente!',
        showConfirmButton: false,
        timer: 1500
      })
 }

  export  {addUserActive, NuevaConsulta};
  