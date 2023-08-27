import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import backendUrl from '../../../../serverConfig';
import axios from 'axios';


import Swal from 'sweetalert2';
import { useNavigate,useLocation } from "react-router-dom";
import { button, TextField } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import { useSpring, animated } from 'react-spring';


import '../../../../GlobalStyles/Resources.css';


import logo from '../../../../GlobalStyles/images/logo.svg';
import imagen from '../../../../GlobalStyles/images/image1.png';

const ModuleTallerDelete= () => {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  //////////////////////////////////////////////////////////////---------------> Variables a utilizar
  
  const [Nombre, setNombre] = useState('');
  const [AP, setAP] = useState('');
  const [AM, setAM] = useState('');
  const [pass, setpass] = useState(''); //pass sin hash
  const [Password, setPassword] = useState('');
  const [Acceso, setAcceso] = useState('');
  const [NumUsuario, setNumUs] = useState('');
  const [centros, setCentros] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  const [Indice, setIndice] = useState('');
  const [User_ID, setUserID] = useState('');
  const routeLocation = useLocation();
  const navigate = useNavigate();



  const ID_Personal = routeLocation.state && routeLocation.state.ID_PERSONAL;


  //////////////////////////////////////////////////////////////---------------> Metodo para hacer el envío del formulario
  const handleSubmit = () => {
    
    // Envía los datos al servidor
    // Crear un objeto con los datos del formulario


 

    //CEDIF-01P2310

    const formData = {
      ID: User_ID
    };


    axios.post(backendUrl + '/api/VerificarTallerID', formData)
      .then(response => {
        
 
      if (response.status === 200) {             
         
        axios.post(backendUrl + '/api/TallerDelete', formData)
        .then(response => {
          
   
        if (response.status === 200) {             
            AlertaTimer('success', 'Eliminado', );
           navigate('/MenuTalleres' , { state: { ID_PERSONAL: ID_Personal } });
            
          } else {
            
            // Autenticación fallida
            Alerta('error', 'Sin éxito', 'No se encontró el ID');
          }
  
  
        })
        .catch(error => {
          // Manejar errores si ocurre alguno
          if (error.response) {
            console.log('Código de estado de error:', error.response.status); // Muestra el código de estado de error en la consola
            console.error('Error:', error);
            // Aquí también podrías mostrar un mensaje al usuario indicando que ocurrió un error.
          }
          console.error(error);
        });

          
        } else {
          
          // Autenticación fallida
          Alerta('error', 'Sin éxito', 'No se encontró el ID');
        }


      })
      .catch(error => {
        // Manejar errores si ocurre alguno
        if (error.response) {
          console.log('Código de estado de error:', error.response.status); // Muestra el código de estado de error en la consola
          console.error('Error:', error);
          // Aquí también podrías mostrar un mensaje al usuario indicando que ocurrió un error.
        }
        console.error(error);
      });



  };

  /////////////////////////////////////////////////////////////////////////-----------------> delete user
  function DeleteUser(id) {
    const requestData = {
      ID: id
    };

    axios.post(backendUrl + '/api/DeleteUserInfoComplete', requestData)
      .then(response => {
        // Manejar la respuesta del servidor si es necesario
        console.log(response.data);
        if (response.status === 200) {
          AlertaTimer('success', 'Completado', 'Se ha eliminado correctamente', 1500);

          navigate(-1);
        } else {
          // Autenticación fallida
          Alerta('error', 'Sin éxito', 'Falló al eliminar la información');
        }
      })
      .catch(error => {
        // Manejar errores si ocurre alguno
        console.error(error);
      });

  }

  function msgDelete(PersonalID, Nombre, AP, AM){
    Swal.fire({
      title: '¿Deseas eliminar al siguiente usuario?',
      html: '<div style="text-align: left;"><strong>ID:  </strong>' + PersonalID + '</div><div style="text-align: left;"><strong>Nombre:  </strong>' + Nombre + '</div><div style="text-align: left;"><strong>Apellido Paterno:  </strong>' + AP + '</div><div style="text-align: left;"><strong>ApellidoMaterno:  </strong>' + AM,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: 'No, cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire('Eliminado', '', 'success')
        //eliminar
        DeleteUser(PersonalID);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  //////////////////////////////////////////////////////////////---------------> Metodo para manejar el cambio de estado del combo de Rol


  //////////////////////////////////////////////////////////////---------------> Método para validar si los textbox tienen texto y crear el user ID


  function Alerta(icono, titulo, texto) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Aceptar'
    })
  }
  function AlertaTimer(icono, titulo, texto, tiempo) {
    Swal.fire({
      position: 'center',
      icon: icono,
      title: titulo,
      text: texto,
      showConfirmButton: false,
      timer: tiempo
    })
  }

  const GoFormCosulta = () => {
    navigate("/Psicologia-NewConsult-Form");
  }

  const Regresar = () => { navigate(-1); }

  //////////////////////////////////////////////////////////////---------------RETURN()-------------//////////////////////////////////////////////////////////////////////////////////

  return (
    <body>
      <div className="left-panel">
        <img src={logo} className='logo' />
        <div className='contTitleLeft' >
          <label className='labelPanelLeft'>Crear nueva consulta</label>
          <div className='line'></div>
        </div>
        <div className='contMenu' >
          <div className='optionBtn' onClick={Regresar}>
            <label className='txtBTN'>Volver al menú</label>
          </div>

        </div>
        <div className='contentImage'>
         <img src={""} className='imagen' />
        </div>
      </div>




      <div className="right-panel">
        <div className="right-panel-content">
          <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Buscar taller</animated.h1>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el ID del Taller</label>
              <input class="inputGlobal" placeholder="ID traller" type="text" value={User_ID} onChange={e => setUserID(e.target.value)} required />
            </div>




            <button className='buttonPrincipalGlobal' onClick={handleSubmit}>Buscar usuario</button>

            <button className='buttonPrincipalGlobal' onClick={Regresar}>Cancelar</button>

          </div>
        </div>

      </div>

    </body>
  );
};

export default ModuleTallerDelete;