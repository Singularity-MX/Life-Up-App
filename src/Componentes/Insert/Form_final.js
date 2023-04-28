import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import firebase from "../../firebase";

import React from "react";
import './Insertar.css';
import logo from '../images/Home/general.png';
import Header from "../Header";
import imagen from "../images/User_add/foto.png";
import {useNavigate} from "react-router-dom";
/*Funciones importadas*/

function showAlert(id) {
   
 }

function Form_final(){

  let navigate = useNavigate();
  
  
    /*SWEET ALERT*/
    const [id, setId] = useState(null);
    useEffect(() => {
      firebase.ref('/UltimosUsuarios/UserAdd').once('value').then((snapshot) => {
        const valor  = snapshot.val(); //obtiene el value del ultimo user activo
        setId(valor);
        
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          html: 'Se completó el registro de forma satisfactoria. Se le asignó el número de usuario: <strong>'+valor+'</strong>, te servirá para localizarlo en el sistema.',
          confirmButtonColor: '#4CAF50',
          confirmButtonText: 'Ir a HOME'
        }).then((result) => {
          if (result.isConfirmed) {
              /**incluir funcion de retorno al home*/
  
            Swal.fire({
              title: 'Regresando al Inicio',
              text: 'Gracias por su registro, en seguida te regresamos al Home!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
          });
          navigate("/loader-Home");
  
          }
        })

      });
      
      }, []);
    

    
return(
    <div>
    <Header texto="REGISTRO EXITOSO" />
    

  </div>
);
}

export default Form_final;