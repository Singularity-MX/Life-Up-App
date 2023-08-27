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


import { useSpring, animated } from 'react-spring';


import LogoLogin from '../../GlobalStyles/images/IconLogoLifeUp.png';
import imgLogin1 from '../../GlobalStyles/images/imgLogin1.svg';


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
  const password = "";
  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  //login
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword] = useState("");
  const [pass, setPasswordVisible] = useState("");



  const [isVisible, setIsVisible] = useState(false);

  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  const zoom = useSpring({ transform: 'scale(1)', from: { transform: 'scale(0.5)' } });

  const zoomWithDelay = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.5)' },
    config: { delay: 2000 } // Agregar un retraso de 1000ms (1 segundo)
  });

  const slide = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  });

  const fadeInUp = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    from: { opacity: 0, transform: 'translateY(20px)' }
  });


  const [isAnimating, setIsAnimating] = useState(false);


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
        const id_personal = responseData.ID;

        navigate('/MenuApp', { state: { ID_PERSONAL: id_personal, Rol: role } });
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
    <div id='body'>

      <div id='contenedor_img'>
        <div id='contentHeader'><embed type="image/svg+xml" alt="SVG" src="https://cdn-us.icons8.com/docs/mgJd1Ewo7U2qOmtDFpJYhQ/OANR1KxWG0GiAeq0TWSrnQ.svg" id='Logo' />
        </div>
        <animated.img style={fade} id="image" src={imgLogin1} preload="true" />

      </div>


      <animated.div style={slide} id="contenedor_form">
        <div id='contenedor_Menu_top'>
          <div id='Option' onClick={handleUserAdmin}><p>Administrador</p></div>
        </div>
        <img src={LogoLogin} id='IconoLoginForm' preload="true"/>

        <animated.h1 style={fade} id="TitleLogin">Iniciar Sesión</animated.h1>

        <p>¡Inicia sesión para acceder a todas las funciones!</p>
        <form onSubmit={onSubmit}>
          <input id="inpt_Login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="usuario" placeholder='Correo electrónico' />
          <input id="inpt_Login" type={showPassword ? 'text' : 'password'} value={password2} onChange={(e) => setPassword(e.target.value)}  name="password" placeholder='Contraseña'  />
          <button type="button" onClick={handleTogglePassword} className='btnShow'>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="ico_show" /> {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              </button>
          <button className='buttonLogin'>Iniciar Sesión</button>
        </form>
      </animated.div>
    </div >
  );
}

export default InicioSesion;