import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../../serverConfig';

import '../../../GlobalStyles/Resources.css';

import logo from '../../../GlobalStyles/images/logo.svg';
import imagen from '../../../GlobalStyles/images/image1.png';


const MenuPsico = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [copiedPersonalID, setCopiedPersonalID] = useState('');

    const handleRowClick = (personalID) => {
        // Copiar al portapapeles
        navigator.clipboard.writeText(personalID);
        setCopiedPersonalID(personalID);
        Swal.fire({
            icon: 'success',
            title: 'Copiado',
            text: 'ID copiado al portapapeles',
            showConfirmButton: false,
            timer: 800

        })
    };



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(backendUrl + '/api/tableRol');
                const responseData = await response.json();
                if (response.ok) {
                    setUsers(responseData);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };

        fetchUsers();
    }, []);

    function GoAddUser() {
        navigate("/FormularioPersonal");
    }
    function GoLogOut() {
        navigate("/loader-Login");
    }
    const DeleteUser = () => {
        navigate("/DeleteUserPersonal");
    }
    const ModifyUser = () => {
        navigate("/EditUserPersonal");
    }

    return (
        <body>
            <div className="left-panel">
                <img src={logo} className='logo' />
                <div className='contTitleLeft' >
                    <label className='labelPanelLeft'>Menu de Psicología</label>
                    <div className='line'></div>
                </div>
                <div className='contMenu' >
                    <div className='optionBtn' onClick={GoAddUser}>
                        <label className='txtBTN'>Psicología</label>
                    </div>
                    <div className='optionBtn' onClick={ModifyUser}>
                        <label className='txtBTN'>Enfermería</label>
                    </div>
                    <div className='optionBtn' onClick={DeleteUser}>
                        <label className='txtBTN'>Agregar usuarios</label>
                    </div>
                    <div className='optionBtn' onClick={GoLogOut}>
                        <label className='txtBTN'>Talleres</label>
                    </div>
                    <div className='optionBtn' onClick={GoLogOut}>
                        <label className='txtBTN'>Estadística general</label>
                    </div>
                    <div className='optionBtn' onClick={GoLogOut}>
                        <label className='txtBTN'>Cerrar sesión</label>
                    </div>
                </div>
                <div className='contentImage'>
                    <img src={imagen} className='imagen' />
                </div>
            </div>




            <div className="right-panel">
                <div className="right-panel-content">
                    <div className='formSecundarioBTN'>
                        <button className='buttonPrincipalGlobal' onClick={GoAddUser}>Psicología</button>
                        <button className='buttonPrincipalGlobal' onClick={ModifyUser}>Enfermería</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Estadística General</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Agregar Usuarios</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Talleres</button>
                        <button className='buttonPrincipalGlobal' onClick={GoLogOut}>Cerrar Sesión</button>

                    </div>

                    <div className='table_container'>
                        <h1 className='titleForm'>ROL ADMIN</h1>
                     
                    </div>
                </div>
            </div>


        </body>
    );
};

export default MenuPsico;
