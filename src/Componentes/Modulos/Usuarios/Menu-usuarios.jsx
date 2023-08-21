//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> IMPORTS 
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from "react-router-dom";
import backendUrl from '../../../serverConfig';
import '../../../GlobalStyles/Resources.css';
import logo from '../../../GlobalStyles/images/logo.svg';
import imagen from '../../../GlobalStyles/images/image1.png';
import '../Widgets/styles/test.css';
import axios from 'axios';
import GenderChart from '../Widgets/Graficos/GraficaPastelSexos'; // Asegúrate de importar el componente adecuadamente
import LineChart from '../Widgets/Graficos/GraficoLineasRegistroUsuarios'; // Ajusta la ruta del archivo según tu estructura de carpetas
import WidgetPersonalInformation from '../Widgets/CardUserPersonal';
import { FaCheck, FaCopy } from 'react-icons/fa';

/*--------------------------------------------------------  FUNCION PRINCIPAL  -------------------------------------------------------------- */
const MenuUsers = () => {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> DECLARACIONES 
    const routeLocation = useLocation();
    const ID = routeLocation.state && routeLocation.state.ID_PERSONAL;
    const Rol = routeLocation.state && routeLocation.state.Rol;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    const [copiedPersonalID, setCopiedPersonalID] = useState('');
    const [Nombre, setNombre] = useState("Nombre");
    const [Direccion, setDireccion] = useState("Dirección");
    const [Sexo, setSexo] = useState("Sexo");
    const [Fecha, setFecha] = useState("Fecha de ingreso");
    const [Familiar, setFamiliar] = useState("Familiar");
    const [Edad, setEdad] = useState("Edad");
    const [Telefono, setTelefono] = useState("Telefono");
    const [URL_photo, setPhotoUrl] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const [datosSexo, setDatosSexos] = useState("Telefono");
    const [datosFechas, setDatosFechas] = useState("Telefono");

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> FUNCIONES 
    const handleRowClick = (personalID) => {
        // Copiar al portapapeles
        navigator.clipboard.writeText(personalID);
        setCopiedPersonalID(personalID);
        //obtener info de usuario
        getInfoCard(personalID);
        //obtene rfoto
        getPhoto(personalID);
    };

    const handleCopied = (personalID) => {
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

    const getInfoCard = async (ID) => {
        //datos a enviar
        const formData = {
            ID
        };
        //peticion al server
        axios.post(backendUrl + '/api/getWidgetInfo', formData)
            .then(response => {
                // Manejar la respuesta del servidor si es necesario
                setNombre(response.data.Nombre);
                setDireccion(response.data.Direccion);
                setSexo(response.data.Sexo);
                setFamiliar(response.data.Familiar);
                setEdad(response.data.Edad);
                setTelefono(response.data.Telefono);
                setFecha(response.data.Fecha);
            })
            .catch(error => {
                // Manejar errores si ocurre alguno
                console.error(error);
            });
    };

    const getPhoto = (ID) => {
        const formData = {
            ID
        };
        // Función para obtener la foto del usuario
        //peticion al server
        axios.get(backendUrl + '/api/ObtenerFoto',
            {
                responseType: 'blob',
                params: formData,
            })
            .then(response => {
                // Convertir la respuesta binaria a una URL de objeto blob
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);

                // Actualizar el estado con la URL de la foto
                setPhotoUrl(url);

                // Mostrar una notificación de éxito utilizando SweetAlert2

            })
            .catch(error => {
                // Mostrar una notificación de error utilizando SweetAlert2

                console.error(error);
            });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> NAVIGATES
    const regresar = () => { navigate('/MenuApp', { state: { ID_PERSONAL: ID, Rol: Rol } }); };

    function InsertUser() { navigate("/addUserPersonal", { state: { ID_PERSONAL: ID, Rol: Rol } }); }

    const DeleteUser = () => { navigate("/MouleUserDelete"); }

    function GoLogOut() { navigate("/loader-Login"); }

    const ModifyUser = () => { navigate("/EditUserPersonal"); }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> USE EFFECT() 
    useEffect(() => {
        //Obtener tabla de usuarios
        const fetchUsers = async () => {
            try {
                const response = await fetch(backendUrl + '/api/tableUsers');
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
        //Obtener el json de sexos
        const getDistribucionSexo = async () => {
            try {
                const response = await fetch(backendUrl + '/api/widgets-Get-sexos');
                const responseData = await response.json();
                if (response.ok) {
                    setDatosSexos(responseData);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };
        //obtener el json de ffechas
        const getDistribucionFechas = async () => {
            try {
                const response = await fetch(backendUrl + '/api/widgets-Get-Fechas');
                const responseData = await response.json();
                if (response.ok) {
                    setDatosFechas(responseData);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };

        getDistribucionSexo();
        getDistribucionFechas();
        fetchUsers();
    }, []);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> RETURN () 
    return (
        <body>
            <div className="left-panel">
                <img src={logo} className='logo' />
                <div className='contTitleLeft' >
                    <label className='labelPanelLeft'><strong>USUARIOS</strong></label>
                    <div className='line'></div>
                </div>
                <div className='contMenu' >
                    <div className='optionBtn' onClick={InsertUser}>
                        <label className='txtBTN'>Agregar usuario</label>
                    </div>
                    <div className='optionBtn' onClick={DeleteUser}>
                        <label className='txtBTN'>Eliminar usuario</label>
                    </div>
                    <div className='optionBtn' onClick={regresar}>
                        <label className='txtBTN'>Volver</label>
                    </div>
                </div>
                <div className='contentImage'>
                    <img src={imagen} className='imagen' />
                </div>
            </div>
            <div className="right-panel">
                <div className='formSecundarioBTN'>
                    <button className='buttonPrincipalGlobal' onClick={InsertUser}>Agregar usuario</button>
                    <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Eliminar usuario</button>
                    <button className='buttonPrincipalGlobal' onClick={regresar}>Volver </button>
         
                </div>
                <div class="containerTotal">
                    <div class="WIDGET-1">
                        <LineChart
                            color={'#477BFF'}
                            titulo={"Registro de usuarios"}
                            descripcion={"Comportamiento de la alta de usuarios"}
                            titleX={"Meses"}
                            titleY={"Usuarios"}
                            datos={datosFechas}
                        />
                    </div>
                    <div class="WIDGET-2">
                        <GenderChart
                            color1={'#477BFF'}
                            color2={'#47D1CB'}
                            hole={0.5}
                            titulo={"Distribución de sexo"}
                            datos={datosSexo}
                            Graphic3D={false}
                        />
                    </div>
                    <div class="CARD">
                        <WidgetPersonalInformation
                            Nombre={Nombre}
                            Direccion={Direccion}
                            Sexo={Sexo}
                            Fecha={Fecha}
                            Familiar={Familiar}
                            Edad={Edad}
                            Telefono={Telefono}
                            ID_user={copiedPersonalID}
                            ImageURL={URL_photo}
                        />
                    </div>
                    <div class="TABLA">
                        <h1 className='titleForm'>Usuarios registrados {Rol} </h1>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    <th>ID de Usuario</th>
                                    <th>Centro</th>
                                    <th>Nombre</th>
                                    <th>Apellido Paterno</th>
                                    <th>Apellido Materno</th>
                                    <th>Edad</th>
                                    <th>Telefono</th>
                                    <th>Sexo</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.UserID} onClick={() => handleRowClick(user.UserID)}>
                                        <td onClick={() => handleCopied(user.UserID)}><FaCopy /> </td>
                                        <td>{user.UserID}</td>
                                        <td>{user.CentroID}</td>
                                        <td>{user.Nombre}</td>
                                        <td>{user.ApellidoPaterno}</td>
                                        <td>{user.ApellidoMaterno}</td>
                                        <td>{user.Edad}</td>
                                        <td>{user.Telefono}</td>
                                        <td>{user.Sexo}</td>
                                        <td>{user.Fecha}</td>
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

export default MenuUsers;
