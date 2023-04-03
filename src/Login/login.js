import React from "react";
import './login.css';

function Login() {
  return (

      <div className='targetForm'>
        <div className='panel_izq'><p>hola</p></div>
        <div className='panel_der'>
          <h1>HOLA</h1>
          <div className='containerForm'>
            <form>
            <input type="text" name="usuario" /><br/>
            <input type="password" name="contrasena" /><br/>
            <button type="submit">Iniciar sesión</button>
          </form>
          </div>
        </div>
      </div>

  );
}

export default Login;