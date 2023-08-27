import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../serverConfig';

import '../../GlobalStyles/Resources.css';
import './styleDash.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';


const PanelAdmin = () => {
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
        navigate("/LoginSU");
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
                    <label className='labelPanelLeft'>Menu de Administrador</label>
                    <div className='line'></div>
                </div>
                <div className='contMenu' >
                    <div className='optionBtn' onClick={GoAddUser}>
                        <label className='txtBTN'>Agregar personal</label>
                    </div>
                    <div className='optionBtn' onClick={ModifyUser}>
                        <label className='txtBTN'>Modificar personal</label>
                    </div>
                    <div className='optionBtn' onClick={DeleteUser}>
                        <label className='txtBTN'>Eliminar personal</label>
                    </div>
                    <div className='optionBtn' onClick={GoLogOut}>
                        <label className='txtBTN'>Cerrar sesión</label>
                    </div>
                </div>
                <div className='contentImage'>
                    <img src={""} className='imagen' />
                </div>
            </div>




            <div className="right-panel">
                <div className="right-panel-content">
                    <div className='formSecundarioBTN'>
                        <button className='buttonPrincipalGlobal' onClick={GoAddUser}>Agregar personal</button>
                        <button className='buttonPrincipalGlobal' onClick={ModifyUser}>Modificar personal</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Eliminar personal</button>
                        <button className='buttonPrincipalGlobal' onClick={GoLogOut}>Cerrar Sesión</button>

                    </div>

                    <div className='table_container'>
                        <h1 className='titleForm'>Personal registrado</h1>
                        <table className='table'>

                            <thead>
                                <tr>
                                    <th>ID de Personal</th>
                                    <th>Rol</th>
                                    <th>ID Centro</th>
                                    <th>Email</th>

                                    <th>Acceso</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.PersonalID} onClick={() => handleRowClick(user.PersonalID)}>
                                        <td>{user.PersonalID}</td>
                                        <td>{user.Rol}</td>
                                        <td>{user.ID_Centro}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.Acceso}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </body>
    );
};

export default PanelAdmin;
