import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../serverConfig';

import '../../GlobalStyles/Resources.css';
import './styleLogin.css';

import logo from '../../GlobalStyles/images/logo.svg';
import { useSpring, animated } from 'react-spring';

const LoginSU = () => {
    const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(backendUrl + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Autenticación exitosa, puedes redirigir al usuario a otra página
                //alert('Inicio de sesión exitoso');
                navigate("/loader-DashboardSU");
            } else {
                // Autenticación fallida
                errorAuth('error', 'Autenticación fallida', 'Las credenciales proporcionadas no coinciden para su acceso.');
                //alert('Inicio de sesión fallido');
            }
        } catch (error) {
            alert('Error al enviar la solicitud: ' + error.message);
        }

    };


    //msgs

    function errorAuth(icono, titulo, texto) {
        Swal.fire({
            icon: icono,
            title: titulo,
            text: texto,
            confirmButtonColor: '#4CAF50',
            confirmButtonText: 'Reintentar'
        })
    }

const salir = () => {
    navigate("/loader-Login");
}
    return (
        <body className='BodyLogin'>
            <div className='cont_login'>
                <div id='headerLogin'>
                <img id="logoLogin" src={logo}/>
                </div>
               
                <div className='formContainer'>
                    <animated.h1 style={fade} id="titleLogin">Inicia Sesión</animated.h1>
                    <label>Por favor accede con tus credenciales: </label>
                    <form onSubmit={handleSubmit}>
                        <div className='cont_inputs'>
                            <label className='labelInput'>Correo Electrónico</label>
                            <input
                                type="text"
                                class="inputGlobalLogin"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='cont_inputs'>
                            <label className='labelInput'>Contraseña</label>
                            <input
                                type="password"
                                class="inputGlobalLogin"
                                placeholder="************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='cont_inputs'>
                        <button className='buttonPrincipalGlobal_Login' type="submit">Iniciar sesión</button>
                        <button className='buttonPrincipalGlobal_Login' type="button" onClick={salir}>Atrás</button>
                        </div>



                       

                    </form>
                </div>
            </div>
        </body>
    );
};

export default LoginSU;





