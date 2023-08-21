//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> IMPORTS 
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import backendUrl from '../../../../serverConfig';
import "../styleAdd.css";
import { useSpring, animated } from 'react-spring';
import logo from '../../../../GlobalStyles/images/logo.svg';
import imagen from '../../../../GlobalStyles/images/image1.png';
import Swal from 'sweetalert2';
import { FaCheck } from 'react-icons/fa';

/*--------------------------------------------------------  FUNCION PRINCIPAL  -------------------------------------------------------------- */
const Form_user_finally = () => {
  // URL del endpoint para servir la imagen

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> DECLARACIONES 
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  //Declaraciones de estado para almacenar los datos del los inputs
  const [nombre, setNombre] = useState('');
  const [ap, setAp] = useState('');
  const [am, setAm] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [tel, setTel] = useState('');
  const [parentesco, setPar] = useState('');
  const [ID, setID] = useState('');
  const [Indice, setIndice] = useState('');
  const routeLocation = useLocation();
  const ID_recibido = routeLocation.state && routeLocation.state.ID_USER;
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  const [calle, setCalle] = useState('');
  const [col, setCol] = useState('');
  const [cp, setCp] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [delegacion, setDelegacion] = useState('');
  const [centroID, setCentro] = useState('');
  //nunmero de usuarios
  const [ultimoUserNum, setNumUs] = useState('');
  const [año, setAño] = useState('');
  const UserID = ID_recibido;
  let nombreFromServer ="";
  const [url, setURl] = useState('');

  const [nombreEmergency, setNomEmer] = useState('');
  const [apEmergency, setApEmergency] = useState('');
  const [amEmergency, setAmEmergency] = useState('');
  const [TelEmergency, setTelEmergency] = useState('');
  const [parentescoEmergency, setParentescoEmergency] = useState('');
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> FUNCIONES 

  //funciones para el navigate
  const HomeUser = () => { navigate("/MenuUsers"); }
  const Regresar = () => { navigate(-1); }

  //Función que permite escribir en mayusculas solamente.
  const handleInput = (event) => { event.target.value = event.target.value.toUpperCase(); };

  //-----Funciones para establecer los valores a las declaraciones de estados
  const handleInputNombre = (event) => { setNombre(event.target.value); }
  const handleInputAp = (event) => { setAp(event.target.value); }
  const handleInputAm = (event) => { setAm(event.target.value); }
  const handleInputTel = (event) => { setTel(event.target.value); }
  const handleInputPar = (event) => { setPar(event.target.value); }
  const handleInputSexo = (event) => { setSexo(event.target.value); }

  //Función que permite agregar los datos conectandose a un endpoint
  const handleSubmit = (event) => {

    //variables de base de datos
    const UserID = ID_recibido;


    const User_ID = UserID;
    const Nombre = nombre;
    const ApellidoPaterno = ap;
    const ApellidoMaterno = am;
    const Telefono = tel;
    const Parentesco = parentesco;
    				
    const formData = {
      UserID,
      Nombre,	
      ApellidoPaterno,	
      ApellidoMaterno,	
      Telefono,	
      Parentesco
    };




    // Enviar los datos al servidor utilizando Axios
    axios.post(backendUrl + '/api/addInformationEmergencyUser', formData)
      .then(response => {
        // Manejar la respuesta del servidor si es necesario

        if (response.status === 200) {
          // Autenticación exitosa, puedes redirigir al usuario a otra página
          //Alerta(icono, titulo, texto) ('Inicio de sesión exitoso');
          //            navigate("/loader-DashboardSU");

          //redigir y pasar el ID
          //navigate("/loader-DashboardSU");
          AlertaTimer('success', 'Sección completada', 1000);
          navigate('/addUserFoto', { state: { ID_USER: ID_recibido } });

        } else {
          // Autenticación fallida
          Alerta('error', 'Sin éxito', 'Falló al registrar la información');
        }
      })
      .catch(error => {
        // Manejar errores si ocurre alguno
        console.error(error);
      });




    //Alerta('success', 'id: '+ID_recibido);

  }
  const funcion = (event) => {

    


    const User_ID = UserID;
    const Nombre = nombre;
    const ApellidoPaterno = ap;
    const ApellidoMaterno = am;
    const Telefono = tel;
    const Parentesco = parentesco;
    
    
   

    //Alerta('success', 'id: '+ID_recibido);

  }
  //funciones de alerta
  function Alerta(icono, titulo, texto) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Aceptar'
    })
  }
  function AlertaTimer(icono, titulo, tiempo) {
    Swal.fire({
      position: 'center',
      icon: icono,
      title: titulo,
      showConfirmButton: false,
      timer: tiempo
    })
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> USE EFFECT() 
  useEffect(() => {
 //variables de base de datos
 
    
 const formData = {
   UserID
 };




 // Enviar los datos al servidor utilizando Axios
 axios.post(backendUrl + '/api/obtenerInfoNuevoUser', formData)
   .then(response => {
     // Manejar la respuesta del servidor si es necesario
     
      nombreFromServer = response.data.Nombre;
      setNombre(response.data.Nombre);
      setAp(response.data.Ap);
      setAm(response.data.Am);
      setEdad(response.data.Edad);
      setTel(response.data.Tel);

      setCalle(response.data.Calle);
      setCol(response.data.Colonia);
      setCp(response.data.CP);
      setEstado(response.data.Estado);
      setDelegacion(response.data.Del);
      setCiudad(response.data.Ciudad);

      setNomEmer(response.data.NombreEmergencia);
      setApEmergency(response.data.ApE);
      setAmEmergency(response.data.AmE);
      setTelEmergency(response.data.TelEmer);
      setParentescoEmergency(response.data.Parentesco);
      const urlserver= response.data.URL;
      setURl(backendUrl+(urlserver));
 //alert('Nombre from server: ' + nombreFromServer);
     
   })
   .catch(error => {
     // Manejar errores si ocurre alguno
     console.error(error);
   });



  }, [navigate]);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> RETURN () 
  return (
    <body>
      <div className="left-panel">
        <img src={logo} className='logo' />
        <div className='contTitleLeft' >
          <label className='labelPanelLeft'><strong>Secciones completadas</strong></label>
          <div className='line'></div>
        </div>

        <label className='txtBTN' ><FaCheck /> Información personal</label>
        <label className='txtBTN' ><FaCheck /> Información de contacto</label>
        <label className='txtBTN' ><FaCheck /> Información de emergencia</label>
        <label className='txtBTN' ><FaCheck /> Fotografía del usuario</label>
   
       
        <div className='contMenu' >


        </div>
        <div className='contentImage'>
          <img src={imagen} className='imagen' />
        </div>
      </div>

      <div className="right-panel">
        <div className="right-panel-content">
          <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Información Completada</animated.h1>
          

            <div className='containerInputLabel'>
              <label className='labelInput'>Información personal:</label>
              <p className="ParrafoInformacionFinal">ID: {ID_recibido}</p> 
              <p className="ParrafoInformacionFinal">Nombre: {nombre} {ap} {am}</p>
              <p className="ParrafoInformacionFinal">Edad: {edad}</p>             
              <p className="ParrafoInformacionFinal">Telefóno: {tel}</p>             
              <p className="ParrafoInformacionFinal">Dirección: {calle}, {col}, {cp}</p> 
              <p className="ParrafoInformacionFinal">Delegación: {delegacion}</p> 
              <p className="ParrafoInformacionFinal">Ciudad: {ciudad}</p> 
              <p className="ParrafoInformacionFinal">Estado: {estado}</p> 
            </div>

          

            <div className='containerInputLabel'>
              <label className='labelInput'>Contacto de emergencia:</label>
              <p className="ParrafoInformacionFinal">Nombre: {nombreEmergency} {apEmergency} {amEmergency}</p> 
              <p className="ParrafoInformacionFinal">Telefóno: {TelEmergency}</p> 
              <p className="ParrafoInformacionFinal">Parentesco: {parentescoEmergency}</p> 
              <p className="ParrafoInformacionFinal">Parentesco: {url}</p> 
             
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Fotografía:</label>
              <p>Se generó correctamente el usuario, puedes descargar tu comprobante</p>
            </div>


            <button type="submit" className='buttonPrincipalGlobal' onClick={''} >Descargar</button>
            <button type="submit" className='buttonPrincipalGlobal' onClick={HomeUser} >Finalizar</button>
          </div>
        </div>

      </div>

      <div className="">
      </div>



    </body>

  );



}

export default Form_user_finally;