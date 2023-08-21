import { useEffect, useState } from "react";
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Header } from "../Header";
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import Swal from 'sweetalert2';
import backendUrl from '../../serverConfig';
//imports de login firebase
import { Alert, Box, Button, Container, Link, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { signInUser } from "../../firebase";
import { isLoggedIn, startSession } from "../../session";

function errorPassword() {
  Swal.fire({
    icon: 'error',
    title: 'Autenticación fallida',
    text: 'Las credenciales proporcionadas no coinciden para su acceso.',
    confirmButtonColor: '#4CAF50',
    confirmButtonText: 'Reintentar'
  })

}

//---------------------------------------------------------------------function principal
function InicioSesion() {
  const [showPassword, setShowPassword] = useState(false);
  const password ="";
  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  //login
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword] = useState("");
  const [pass, setPasswordVisible] = useState("");
  // redirect the user if he's already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/user");
    }

  }, [navigate]);




  //ir al home
  //navigate("/loader-Home");
  const onSubmit = async (event) => {
    event.preventDefault();
  
    const password = SHA256(password2).toString();
    //-------------> Pasar el Hash de la contraseña
    //alert('user: ' + email + ' pass: ' + password);
    //alert(email +" -> " +password)
    try {
      // Hacer una solicitud POST al punto final de inicio de sesión en el servidor
      const response = await fetch(backendUrl + '/api/loginNormal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
    
      
      // Verificar el estado de la respuesta
      if (response.status === 200) {
        const responseData = await response.json();
        const role = responseData.role;
        const id_personal= responseData.ID;
        
        navigate('/MenuApp' , { state: { ID_PERSONAL: id_personal, Rol: role} });
        // Manejar la lógica basada en roles
      /*  
        if (role === 'Administración') {
          // Redirigir a la página de administración
          
          alert('admin ID: '+ id_personal);
        } else if (role === 'Psicología') {
          alert('psico');
          // Redirigir a la página de psicología
          navigate('/MenuPsico');
        } else if (role === 'Recepción') {
          alert('recep');
          // Redirigir a la página de recepción
          // navigate('/reception');
        } else if (role === 'Enfermería') {
          alert('enfer');
          // Redirigir a la página de salud
          // navigate('/health');
        } else if (role === 'Instructor') {
          alert('inatructor');
          // Redirigir a la página de salud
          // navigate('/health');
            
        } else {
          // Manejar un rol desconocido
          // setError('Unknown role');
        }

        */
      } else {
        if (response.status === 401) {
          errorPassword();
          //window.location.reload(); // Recargar la página
        }
        // Manejar otros estados de respuesta
        setError('An error occurred');
        // alert('no coincide con los usuarios');
      }
    } catch (error) {
      // Manejar errores de solicitud
      setError('An error occurred');
    }
  };
  

  function handleUserAdmin() {
    navigate("/LoginSU");
  }

  //-----------------------------------------------------------------return
  return (
    <div ><Header texto="Inicia Sesión" />

      <div className='targetFormLogin'>

        <div className='panel_izqLogin'></div>
        <div className='panel_derLogin'>
          <h1>INICIA SESIÓN</h1>
          <div className='containerFormLogin'>
            <form onSubmit={onSubmit}>
              <FontAwesomeIcon icon={faUser} className="iconLogin" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="usuario" className="input-login" placeholder='Correo electrónico' /><br />
              <FontAwesomeIcon icon={faLock} className="iconLogin" />
              <input className="input-login" type={showPassword ? 'text' : 'password'} value={password2} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder='Contraseña' /><br />
              <button type="button" onClick={handleTogglePassword} className='btnShow'>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="ico_show" />{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              </button><br />

              <button type="submit" className='boton-login'>Acceder</button>
            </form>
            <button type="button" className='boton-login' onClick={handleUserAdmin}>AdminUsers</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default InicioSesion;