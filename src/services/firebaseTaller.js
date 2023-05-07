import firebase from "../firebase";
import { storage } from '../firebase';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';



//Agregar usuario activo
function addUserActive(ID) {


  firebase.ref('/UltimosUsuarios/Talleres').set(ID); //Add USER

}

//Agregar nuevas consultas
function AddTallerFirebase(nombre, duracion, lugar, instructor, dias, hora) {

  firebase.ref('/Actividades/Talleres/NumeroTalleres').once('value').then((snapshot) => {
    const ID = snapshot.val(); //obtiene el value del ultimo user activo

    const year = new Date().getFullYear().toString();//
    const month = new Date().getMonth().toString();
    const day = new Date().getDate().toString();
    let newID = "";
    console.log(day);
    newID = day + "1" + "117" + year + ID;
    console.log(newID);
    const bucket = "Actividades/Talleres"; //nodo inicial
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Nombre').set(nombre); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Duracion').set(duracion); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Lugar').set(lugar); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Hora').set(hora); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Dias').set(dias); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Instructor').set(instructor); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/ID').set(newID); //Add Nombre

    firebase.ref('/Actividades/Talleres/NumeroTalleres').set(snapshot.val() + 1); //Add Nombre
    firebase.ref('/Actividades/Talleres/Registrados/'+newID+'/Asistentes').set(0);
    showAlertNewConsult('Registro exitoso', 'Se completó el registro del taller exitosamente.', 'success')

  });

}


function removeFirebase(id) {
  // Obtiene una referencia a la ubicación del registro en Firebase Realtime
  const registroRef = firebase.database().ref('/Actividades/Talleres/Registrados/' + id).remove();

  // Utiliza la función remove() para eliminar el registro
  registroRef.remove()
    .then(() => showAlertNewConsult('Eliminación exitosa', 'Se completó eliminó el taller exitosamente.', 'success'))

    .catch((error) => console.log('Error al eliminar registro:', error));
}


function showAlertNewConsult(titulo, mensaje, icono) {
  Swal.fire({
    icon: icono,
    title: titulo,
    html: mensaje,
    showConfirmButton: false,
    timer: 1500
  })
}

function deleteTallerFirebase(id) {
  Swal.fire({
    title: 'Estas seguro de eliminarlo?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Sí, claro',
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const eliminarRegistro = () => {
        // Aquí puedes incluir la lógica para eliminar el registro
        firebase.ref('/Actividades/Talleres/Registrados/' + id).remove();
        console.log('Registro eliminado');
        showAlertNewConsult('Eliminación exitosa', 'Se completó eliminó el taller exitosamente.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      eliminarRegistro(id);
    } else if (result.isDenied) {
      Swal.fire('Eliminación cancelada', '', 'info')
    }
  })
}

function UpdateTallerFirebase(newID, nombre, duracion, lugar, instructor, dias, hora) {


  
    const bucket = "Actividades/Talleres"; //nodo inicial
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Nombre').set(nombre); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Duracion').set(duracion); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Lugar').set(lugar); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Hora').set(hora); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Dias').set(dias); //Add Nombre
    firebase.ref(bucket + '/Registrados' + '/' + newID + '/Instructor').set(instructor); //Add Nombre



    showAlertNewConsult('Actualización exitosa', 'Se completó el registro del taller exitosamente.', 'success')

    setTimeout(() => {
      window.location.reload();
    }, 2000);


}


function Asistencia(newID, idTaller) {
  const year = new Date().getFullYear().toString().slice(-2);//
  const month = new Date().getMonth() +1;
  const day = new Date().getDate();
  let fecha = "";
  fecha=day +"-"+ month+"-"+ year;
 
  firebase.ref('/Actividades/Talleres/Registrados/'+idTaller+'/Asistentes').once('value').then((snapshot) => {
    let asistentes = snapshot.val() + 1;
    
  firebase.ref('/Actividades/Talleres/Registrados/'+idTaller+'/Asistentes').set(asistentes); //registrar asistencia taller
 });


 
 firebase.ref('/User/'+newID+'/UltimaAsistencia').set(fecha); //registrar asistencia taller
 

 firebase.ref('/Asistencia/'+fecha+'/'+newID+'/IdTaller').once('value').then((snapshot) => {
  let taller = snapshot.val() ;
  if(taller==null){ //si no existe asistencia
    firebase.ref('/Asistencia/'+fecha+'/'+newID+'/IdTaller').set(idTaller); //registrar asistencia taller
  }
  else{
    let nuevo= taller.toString() + ','+idTaller;
    firebase.ref('/Asistencia/'+fecha+'/'+newID+'/IdTaller').set(nuevo); //registrar asistencia taller
  }

  //registrar taller en usuario

  
});

  
firebase.ref('/User/'+newID+'/TalleresAsistidos').once('value').then((snapshot) => {
  let taller = snapshot.val() ;
  if(taller==null){ //si no existe asistencia
    firebase.ref('/User/'+newID+'/TalleresAsistidos').set(idTaller); //registrar asistencia taller
  }
  else{
    let nuevo= taller.toString() + ','+idTaller;
    firebase.ref('/User/'+newID+'/TalleresAsistidos').set(nuevo); //registrar asistencia taller
  }
});

 const today = new Date();
 const dayOfWeek = today.getDay();
 
 
 switch (dayOfWeek) {
   case 0:
    firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/DOMINGO').once('value').then((snapshot) => {
      let DIA = snapshot.val() + 1;
      firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/DOMINGO').set(DIA); //registrar asistencia taller
   });
     break;
   case 1:
    firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/LUNES').once('value').then((snapshot) => {
      let DIA = snapshot.val() + 1;
      firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/LUNES').set(DIA); //registrar asistencia taller
   });
     break;
   case 2:
    firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/MARTES').once('value').then((snapshot) => {
      let DIA = snapshot.val() + 1;
      firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/MARTES').set(DIA); //registrar asistencia taller
   });
     break;
   case 3:
    firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/MIERCOLES').once('value').then((snapshot) => {
      let DIA = snapshot.val() + 1;
      firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/MIERCOLES').set(DIA); //registrar asistencia taller
   });
     break;
   case 4:
    firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/JUEVES').once('value').then((snapshot) => {
      let DIA = snapshot.val() + 1;
      firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/JUEVES').set(DIA); //registrar asistencia taller
   });
     break;
   case 5:
    firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/VIERNES').once('value').then((snapshot) => {
      let DIA = snapshot.val() + 1;
      firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/VIERNES').set(DIA); //registrar asistencia taller
   });
     break;
   case 6:
    firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/SABADO').once('value').then((snapshot) => {
      let DIA = snapshot.val() + 1;
      firebase.ref('/ESTADISTICAS/TalleresAsistenciaSemanal/SABADO').set(DIA); //registrar asistencia taller
   });
     break;
   default:
     
    
     
 }
 console.log(dayOfWeek);


  showAlertNewConsult('Actualización exitosa', 'Se completó el registro del taller exitosamente.', 'success')

}



export { AddTallerFirebase, showAlertNewConsult, deleteTallerFirebase, UpdateTallerFirebase, Asistencia };
