import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate,useLocation } from "react-router-dom";
import backendUrl from '../../serverConfig';

import '../../GlobalStyles/Resources.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importar los estilos del carrusel

import './carrousell.css';

import img1 from '../../GlobalStyles/images/carrousell/1.png';
import img2 from '../../GlobalStyles/images/carrousell/2.png';
import img3 from '../../GlobalStyles/images/carrousell/3.png';
const MenuApplication = () => {
    const routeLocation = useLocation();
    const ID =  routeLocation.state && routeLocation.state.ID_PERSONAL;
    const Rol =  routeLocation.state && routeLocation.state.Rol;

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

    //usuarios
    function GoUser() {
        navigate('/MenuUsers' , { state: { ID_PERSONAL: ID, Rol: Rol} });
    }
    function GoPsicologia() {
        navigate('/MenuPsicologia' , { state: { ID_PERSONAL: ID, Rol: Rol} });
    }
    function GoEnfermeria() {
        navigate('/MenuEnfermeria' , { state: { ID_PERSONAL: ID, Rol: Rol} });
    }
    function GoTalleres() {
        navigate('/MenuTalleres' , { state: { ID_PERSONAL: ID, Rol: Rol} });
    }
    function GoEstadistica() {
        navigate('/MenuEstadistica' , { state: { ID_PERSONAL: ID, Rol: Rol} });
    }


    function GoLogOut() {
        navigate("/loader-Login");
    }
    const DeleteUser = () => {
        navigate("");
    }
    const ModifyUser = () => {
        navigate("");
    }
    
    return (
        <body>
            <div className="left-panel">
                <img src={logo} className='logo' />
                <div className='contTitleLeft' >
                    <label className='labelPanelLeft'>Menu </label>
                    <div className='line'></div>
                </div>
                <div className='contMenu' >
                <div className='optionBtn' onClick={GoUser}>
                        <label className='txtBTN'>Usuarios</label>
                    </div>
                    <div className='optionBtn' onClick={GoPsicologia}>
                        <label className='txtBTN'>Psicología</label>
                    </div>
                    <div className='optionBtn' onClick={GoEnfermeria}>
                        <label className='txtBTN'>Enfermería</label>
                    </div>

                    <div className='optionBtn' onClick={GoTalleres}>
                        <label className='txtBTN'>Talleres</label>
                    </div>
                    <div className='optionBtn' onClick={GoEstadistica}>
                        <label className='txtBTN'>Estadística general</label>
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
                        <button className='buttonPrincipalGlobal' onClick={GoUser}>Psicología</button>
                        <button className='buttonPrincipalGlobal' onClick={ModifyUser}>Enfermería</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Estadística General</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Agregar Usuarios</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Talleres</button>
                        <button className='buttonPrincipalGlobal' onClick={GoLogOut}>Cerrar Sesión</button>

                    </div>

                    <div className='table_container'>
                        <h1 className='titleForm'>Tu rol es { Rol} </h1>
                        <Carousel autoPlay={true} interval={4000} infiniteLoop={true}>
      <div>
        <img src={img1} alt="Imagen 1" />
        <p className="legend">Leyenda de la imagen 1</p>
      </div>  
      <div>
        <img src={img2} alt="Imagen 2" />
        <p className="legend">Leyenda de la imagen 2</p>
      </div>
      <div>
        <img src={img3} alt="Imagen 3" />
        <p className="legend">Leyenda de la imagen 3</p>
      </div>
    </Carousel>
                    </div>
                </div>
            </div>


        </body>
    );
};

export default MenuApplication;
