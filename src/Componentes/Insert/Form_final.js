import { useEffect } from 'react';
import Swal from 'sweetalert2';

import React from "react";
import './Insertar.css';
import logo from '../images/Home/general.png';
import Header from "../Header";
import imagen from "../images/User_add/foto.png";
/*Funciones importadas*/

function showAlert() {
    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        html: 'Se completó el registro de forma satisfactoria. Se le asignó el número de usuario: <strong>18181</strong>, te servirá para localizarlo en el sistema.',
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
        })

        }
      })
 }

function Form_final(){

    /*SWEET ALERT*/
    useEffect(() => {
        showAlert();
      }, []);
    

    
return(
    <div>
    <Header texto="REGISTRO EXITOSO" />
    

  </div>
);
}

export default Form_final;