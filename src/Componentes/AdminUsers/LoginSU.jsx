import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import backendUrl from '../../serverConfig';


const LoginSU = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(backendUrl+'/api/login', {
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


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginSU;





