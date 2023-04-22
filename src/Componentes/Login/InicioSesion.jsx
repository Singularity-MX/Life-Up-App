import {useEffect, useState} from "react";
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Header} from "../Header";

import Swal from 'sweetalert2';

//imports de login firebase
import {Alert, Box, Button, Container, Link, TextField, Typography} from "@mui/material";

import {useNavigate} from "react-router-dom";
import {signInUser} from "../../firebase";
import {isLoggedIn, startSession} from "../../session";



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

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  //login
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redirect the user if he's already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/user");
    }
  }, [navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();

    // validate the inputs
    if (!email || !password) {
      setError("Please enter your username and password.");
      return;
    }

    // clear the errors
    setError("");

    try {
      let loginResponse = await signInUser(email, password);
      startSession(loginResponse.user);
      navigate("/loader-Home");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      errorPassword();
    }
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
              <input className="input-login" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder='Contraseña' /><br />
              <button type="button" onClick={handleTogglePassword} className='btnShow'>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="ico_show" />{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              </button><br />

              <button type="submit" className='boton-login'>Acceder</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}

export default InicioSesion;