import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../serverConfig';

import '../../GlobalStyles/Resources.css';
import './styleLogin.css';

import logo from '../../GlobalStyles/images/logo.svg';
import { useSpring, animated } from 'react-spring';





import LogoLogin from '../../GlobalStyles/images/IconLogoLifeUp.png';
import imgLogin1 from '../../GlobalStyles/images/imgLoginAdmin.svg';


const LoginSU = () => {


    const [isVisible, setIsVisible] = useState(false);


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
        <div id='body'>

            <div id='contenedor_img'>
                <div id='contentHeader'><embed type="image/svg+xml" alt="SVG" src="https://cdn-us.icons8.com/docs/mgJd1Ewo7U2qOmtDFpJYhQ/OANR1KxWG0GiAeq0TWSrnQ.svg" id='Logo' />
                </div>
                <animated.img style={fade} id="image" src={imgLogin1} preload="true" />

            </div>


            <animated.div style={slide} id="contenedor_form">
                <div id='contenedor_Menu_top'>
                    <div id='Option' onClick={salir}><p>Usuarios</p></div>
                </div>
                <img src={LogoLogin} id='IconoLoginForm' preload="true"/>

                <animated.h1 style={fade} id="TitleLogin">Administrador</animated.h1>

                <p>¡Inicia sesión para comenzar a administrar tu centro!</p>
                <form onSubmit={handleSubmit}>
                    <input
                    id="inpt_Login" 
                        type="text"
                        class="inputGlobalLogin"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                    id="inpt_Login" 
                        type="password"
                        class="inputGlobalLogin"
                        placeholder="************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className='buttonLogin' type="submit">Iniciar sesión</button>
                    
                </form>
            </animated.div>
        </div >
    );
};

export default LoginSU;





