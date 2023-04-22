import React, { useState } from 'react';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Header, Loader } from "../Header";
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div ><Header texto="Inicia Sesión" />
      <div className='targetFormLogin'>

        <div className='panel_izqLogin'></div>
        <div className='panel_derLogin'>
          <h1>INICIA SESIÓN</h1>
          <div className='containerFormLogin'>
            <form>
              <FontAwesomeIcon icon={faUser} className="iconLogin" />
              <input type="text" name="usuario" className="input-login" placeholder='Nombre de usuario' /><br />
              <FontAwesomeIcon icon={faLock} className="iconLogin" />
              <input className="input-login" type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder='Contraseña' /><br />
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

export default Login;