import React, { useState } from 'react';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {Header, Loader} from "../Header";
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div ><Header texto="Inicia Sesión" />
    <div className='targetForm'>
      
      <div className='panel_izq'></div>
      <div className='panel_der'>
        <h1>INICIA SESIÓN</h1>
        <div className='containerForm'>
          <form>
          <FontAwesomeIcon icon={faUser} className="icon" />

            <input type="text" name="usuario" className="input" placeholder='Nombre de usuario'/><br />
            
            <FontAwesomeIcon icon={faLock} className="icon" />

            <input className="input" type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder='Contraseña'/><br />
            
            <button type="button" onClick={handleTogglePassword} className='btnShow'>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="ico_show"/>{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} 
            </button><br/>

            <button type="submit" className='boton'>Acceder</button>
          </form>
        </div>
      </div>
    </div>
    </div>

  );
}

export default Login;