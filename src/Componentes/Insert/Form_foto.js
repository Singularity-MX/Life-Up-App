import { useEffect } from 'react';
import Swal from 'sweetalert2';


import React from "react";
import './Insertar.css';
import logo from '../images/Home/general.png';
import Header from "../Header";
import imagen from "../images/User_add/foto.png";
/*Funciones importadas*/


/*function para subir las fotos */
async function showAlertFotos(){
    const { value: file } = await Swal.fire({
        title: 'Select image',
        input: 'file',
        inputAttributes: {
          'accept': 'image/*',
          'aria-label': 'Upload your profile picture'
        }
      })
      
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          Swal.fire({
            title: 'Imagen cargada',
            imageUrl: e.target.result,
            imageAlt: 'The uploaded picture', 
            showConfirmButton: true,
            confirmButtonColor: '#4CAF50',
            confirmButtonText: 'Finalizar'
          }).then((result) => {
            if (result.isConfirmed) {
                /**incluir funcion de retorno al home*/
    
              Swal.fire({
                title: 'Cargada con éxito',
                text: 'Espera un momento...',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
    
            }
          })
        }
        reader.readAsDataURL(file)
      }
}

/*------------FUNCION PARA TOMAR FOTOS------------------------------------------ */





function Form_Foto(){


    
return(
    <div>
    <Header texto="REGISTRAR USUARIO" />
    <div className="contenedor-base">
      <div className="form-container">
        <div className="img-container">
          <div className="imgCont"><img src={imagen} className='img-form' /></div>
        </div>
        <div className="inputs-container">
          <form className="form-user">
            <h1 className="title-form">Fotografía</h1>
            <div className="parrafo"><p>A conituación puedes<strong> cargar una foto desde tú equipo local</strong> o si lo prefieres puedes <strong> utilzar tú cámara web para tomar una ahora.</strong></p></div>
            <button type="button" className='btn-foto' >Tomar Fotografía</button>
        
            <button type="button" className='btn-foto'onClick={showAlertFotos} >Cargar archivo local</button>
          </form>
        </div>
      </div>
    </div>

  </div>
);
}
export default Form_Foto;