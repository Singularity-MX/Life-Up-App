//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> IMPORTS 
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import backendUrl from '../../../../serverConfig';

import { useSpring, animated } from 'react-spring';
import logo from '../../../../GlobalStyles/images/logo.svg';
import imagen from '../../../../GlobalStyles/images/image1.png';
import Swal from 'sweetalert2';

/*--------------------------------------------------------  FUNCION PRINCIPAL  -------------------------------------------------------------- */
const ModulePsicoNuevaConsultaForm = () => {

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> DECLARACIONES 
  //Fade para el h1
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  //Declaraciones de estado para almacenar los datos del los inputs
  const [nombre, setNombre] = useState('');
  const [ap, setAp] = useState('');
  const [am, setAm] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [tel, setTel] = useState('');
  const [ID, setID] = useState('');
  const [Indice, setIndice] = useState('');
  const routeLocation = useLocation();
  const ID_Personal = routeLocation.state && routeLocation.state.ID_PERSONAL;
  const ID_User = routeLocation.state && routeLocation.state.ID_USER;
  const Nombre = routeLocation.state && routeLocation.state.Nombre;
  const [centroID, setCentro] = useState('');
  const [ultimoUserNum, setNumUs] = useState('');
  const [año, setAño] = useState('');
  let navigate = useNavigate();
  let [email, setEmail] = useState("");

  const [Fecha, setFecha] = useState('');


const [motivo, setMotivo]= useState("");
const [objetivos, setObjetivos]= useState("");
const [recomendaciones, setRecomendaciones]= useState("");
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> FUNCIONES 
  // Funciones flecha para el navigate
  const Home = () => { navigate("/loader-Home"); }
  const Regresar = () => { navigate(-1); }

  //-----Funciones para establecer los valores a las declaraciones de estados
  const handleInputMotivo = (event) => { setMotivo(event.target.value); }
  const handleInputObjetivos = (event) => { setObjetivos(event.target.value); }
  const handleInputRecom = (event) => { setRecomendaciones(event.target.value); }



  const handleInputEdad = (event) => { setEdad(event.target.value); }
  const handleInputSexo = (event) => { setSexo(event.target.value); }
  const handleInputTel = (event) => { setTel(event.target.value); }

  //Función que permite escribir en mayusculas solamente.
  const handleInput = (event) => { event.target.value = event.target.value.toUpperCase(); };

  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {


    
    //variables de base de datos
    const UserID = ID_User;
    const Motivo = motivo;
    const Objetivos = objetivos;
    const Recomendaciones = recomendaciones;
    const PersonalID = ID_Personal;
    
    //construcción del formData
    const formData = {
      UserID,
      Motivo,
      Objetivos,
      Recomendaciones,
      Fecha,
      PersonalID
    };


      axios.post(backendUrl + '/api/Psicologia-Insert-NewConsult', formData)
      .then(response => {
        if (response.status === 200) {             
          AlertaTimer('success', 'Información completada', 1000);
          navigate('/MenuPsicologia' , { state: { ID_PERSONAL: ID_Personal } });
          
        } else {
          // Autenticación fallida
          Alerta('error', 'Sin éxito', 'Falló al registrar la información');
        }
      })
      .catch(error => {
        // Manejar errores si ocurre alguno
        console.error(error);
      });
  }

  //Funciones para las alertas
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

  //Función para crear el ID de usuario
  function CrearID(idCentro, indice, ultimosDigitosAño) {


    //id de personal = ID_Centro + P + Año + Numero de usuario
    const ID = idCentro + "U" + ultimosDigitosAño + indice;
    setID(ID);
  }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> USE EFFECT() 
  useEffect(() => {
    //Obtener la fecha y su ultimo digito del año
    const currentDate = new Date();
    setAño(currentDate.getFullYear() % 100)
    const ID_generado = "";


    const fechaActual = new Date();

    // Obtén el día, mes y año por separado
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan en 0, por lo que sumamos 1
    const anio = fechaActual.getFullYear();
    
    // Obtén la fecha en formato deseado (por ejemplo, dd/mm/yyyy)
    const fechaFormateada = dia+"/"+mes+"/"+anio;
    setFecha(fechaFormateada);

    //-----------------------------------------------> Obtener el numero de usuarios
    const fetchNumUser = async () => {
      try {
        const response = await fetch(backendUrl + '/api/GetNumUser');
        const responseData = await response.json();
        if (response.ok) {
          const numUs = responseData.Indice; // Reemplaza "numUs" con el nombre de la propiedad adecuada en "responseData"
          setNumUs(numUs);//obten el numero de usuario ultimo
          setIndice(numUs + 1);
          try {
            // Hacer una solicitud POST al punto final de inicio de sesión en el servidor
            const response = await fetch(backendUrl + '/api/GetCentroID', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ID_Personal }),
            });
            // Verificar el estado de la respuesta
            if (response.status === 200) {
              const responseData = await response.json();
              const idCentro = responseData.Centro; // Reemplaza "numUs" con el nombre de la propiedad adecuada en "responseData"
              setCentro(idCentro);//obten el numero de usuario ultimo
              setID(idCentro + "U" + (currentDate.getFullYear() % 100) + (numUs + 1));
            }
            // Verificar el estado de la respuesta
          } catch (error) {
            // Manejar errores de solicitud
            //setError('An error occurred');
          }
        } else {
          console.error('Error al obtener los datos de usuarios');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error.message);
      }
    };

    //------------------------------------------------->obtener centro


    fetchNumUser();

  }, [navigate]);


  //ID - > es el id de usuario
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> RETURN () 
  return (
    <body>
      <div className="left-panel">
        <img src={logo} className='logo' />
        <div className='contTitleLeft' >
          <label className='labelPanelLeft'>Nueva consulta</label>
          <div className='line'></div>
        </div>
        
        <div className='contMenu' >
          <div className='optionBtn' >
            <label className='txtBTN' onClick={Regresar}>Regresar</label>
          </div>
        </div>
        <div className='contentImage'>
         <img src={""} className='imagen' />
        </div>
      </div>

      <div className="right-panel">
        <div className="right-panel-content">

          <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Información personal </animated.h1>
    <h1>{ID_Personal}</h1>
    <h1>{ID_User}</h1>
    <h1>{Nombre}</h1>
            <div className='containerInputLabel'>
              <label className='labelInput'>Motivo de consulta:</label>
              <input type="text" class="inputGlobal" placeholder="Motivo..." value={motivo} onChange={handleInputMotivo} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Objetivos terapeuticos:</label>
              <textarea type="" class="inputGlobal" placeholder="Objetivos" value={objetivos} onChange={handleInputObjetivos} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Recomendaciones:</label>
              <input type="text" class="inputGlobal" placeholder="Recomendaciones" value={recomendaciones} onChange={handleInputRecom} onInput={handleInput} required />
            </div>

            <button type="submit" className='buttonPrincipalGlobal' onClick={handleSubmit} >Enviar </button>
          </div>

        </div>

      </div>

      <div className="">
      </div>
    </body>
  );
}

export default ModulePsicoNuevaConsultaForm;