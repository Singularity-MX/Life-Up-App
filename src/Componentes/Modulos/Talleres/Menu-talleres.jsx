import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation  } from "react-router-dom";
import backendUrl from '../../../serverConfig';
import axios from 'axios';
import '../../../GlobalStyles/Resources.css';

import logo from '../../../GlobalStyles/images/logo.svg';
import imagen from '../../../GlobalStyles/images/image1.png';


const MenuTalleres = () => {
    const routeLocation = useLocation();
    const ID =  routeLocation.state && routeLocation.state.ID_PERSONAL;
    const Rol =  routeLocation.state && routeLocation.state.Rol;

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [copiedPersonalID, setCopiedPersonalID] = useState('');

    const [IDTaller, setIdTaller] = useState('');

    const handleRowClick = (personalID) => {
        // Copiar al portapapeles
        navigator.clipboard.writeText(personalID);
        setCopiedPersonalID(personalID);
        Swal.fire({
            icon: 'success',
            title: 'Copiado',
            text: personalID + ' copiado al portapapeles',
            showConfirmButton: false,
            timer: 800

        })
    };

 const regresar = () => {
    navigate('/MenuApp' , { state: { ID_PERSONAL: ID, Rol: Rol} });
  };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(backendUrl + '/api/tableTalleres');
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

        const getTalleresInfoID = async () => {
            axios.get(backendUrl + '/api/getIDTalleres')
            .then(response => {
              const data = response.data;
              const numeroTaller = data.NumeroTaller;
              setIdTaller(numeroTaller);
              alert(numeroTaller);
            })
            .catch(error => {
              // Manejar errores si ocurre alguno
              console.error(error);
            });
          };


        fetchUsers();
        getTalleresInfoID();
    }, []);

    //usuarios
    function InsertUser() {
        navigate("/addUserPersonal" , { state: { ID_PERSONAL: ID } });
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




     const AddTaller = () => {
        navigate("/Taller-Add-Form", { state: { NumTaller: IDTaller } });
    }
     const ModifyTaller = () => {
        navigate("/");
    }
     const DeleteTaller = () => {
        navigate("/Taller-Delete");
    }


    return (
        <body>
            <div className="left-panel">
                <img src={logo} className='logo' />
                <div className='contTitleLeft' >
                    
                    <label className='labelPanelLeft'><strong>Talleres y actividades</strong></label>
                    <div className='line'></div>
                </div>
                <div className='contMenu' >
                <div className='optionBtn' onClick={AddTaller}>
                        <label className='txtBTN'>Agregar </label>
                    </div>
                    <div className='optionBtn' onClick={ModifyTaller}>
                        <label className='txtBTN'>Editar </label>
                    </div>
                    <div className='optionBtn' onClick={DeleteTaller}>
                        <label className='txtBTN'>Eliminar </label>
                    </div>

                    <div className='optionBtn' onClick={regresar}>
                        <label className='txtBTN'>Volver al menu</label>
                    </div>
         
                </div>
                <div className='contentImage'>
                    <img src={imagen} className='imagen' />
                </div>
            </div>




            <div className="right-panel">
                <div className="right-panel-content">
                    <div className='formSecundarioBTN'>
                        <button className='buttonPrincipalGlobal' onClick={InsertUser}>Psicología</button>
                        <button className='buttonPrincipalGlobal' onClick={ModifyUser}>Enfermería</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Estadística General</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Agregar Usuarios</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Talleres</button>
                        <button className='buttonPrincipalGlobal' onClick={GoLogOut}>Cerrar Sesión</button>

                    </div>

                    <div className='table_container'>
                        <h1 className='titleForm'>Talleres {Rol}</h1>
                        <table className='table'>

                            <thead>
                                <tr>
                                    <th>ID de Taller</th>
                                    <th>Nombre</th>
                                    <th>Centro</th>
                                    <th>Instructor</th>
                                    <th>Duración</th>
                                    <th>Días</th>
                                    

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.TallerID} onClick={() => handleRowClick(user.TallerID)}>
                                         <td>{user.TallerID}</td>
                                        <td>{user.Nombre}</td>
                                        <td>{user.CentroID}</td>
                                        <td>{user.Instructor}</td>
                                        <td>{user.Duracion}</td>
                                        <td>{user.Dias}</td>
                                        
                                        
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

export default MenuTalleres;
