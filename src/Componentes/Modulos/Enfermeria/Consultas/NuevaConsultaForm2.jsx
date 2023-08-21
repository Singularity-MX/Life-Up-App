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
const ModuleSaludNewConsultaForm = () => {

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


  
  const [objetivos, setObjetivos] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");



  
  const [padecimientos, setPadecimientos] = useState('');
  const [alergias, setAlergias] = useState('');
  const [sangre, setSangre] = useState('');

  
  const [selectDesactivado, setSelectDesactivado] = useState(false);

  const [selectDesactivadoAlergias, setSelectDesactivadoAlergias] = useState(false);


  const [temp, setTemp] = useState('');
  const [fc, setFc] = useState('');
  const [presion, setPresion] = useState('');
  const [fr, setFr] = useState('');
  const [sos, setSos] = useState('');
  const [medic, setMedic] = useState('');
  const [motivo, setMotivo] = useState('');
  const [recom, setRecom] = useState('');
  const [glucosa, setGlucosa] = useState('');

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


  function handleCheckboxChange(event) {
    setSelectDesactivado(event.target.checked);
    setPadecimientos("NINGUNO");
    console.log(padecimientos);
  }

  function handleCheckboxChangeAlergias(event) {
    setSelectDesactivadoAlergias(event.target.checked);
    setAlergias("NINGUNO");
    console.log(alergias);
  }


  //Función que permite escribir en mayusculas solamente.
  const handleInput = (event) => { event.target.value = event.target.value.toUpperCase(); };

  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {



    //variables de base de datos
    const UserID = ID_User;
    const Motivo = motivo;

    const Padecimientos = padecimientos;
    const Alergias = alergias;
    const PersonalID = ID_Personal;

const FrecuenciaCardiaca = fc;
const FrecuenciaRespiratoria = fr;
const Glucosa = glucosa;
const SatOxigeno = sos;
const PresionArterial = presion;
const Medicacion = medic;

    //construcción del formData
    const formData = {
      UserID,
      PersonalID,	
      FrecuenciaCardiaca,	
      FrecuenciaRespiratoria,	
      Glucosa,	
      SatOxigeno,	
      PresionArterial,	
      Medicacion,	
      Fecha
    };


    axios.post(backendUrl + '/api/Salud-Insert-NewConsult', formData)
      .then(response => {
        if (response.status === 200) {
          AlertaTimer('success', 'Información completada', 1000);
          navigate('/MenuEnfermeria', { state: { ID_PERSONAL: ID_Personal } });

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
    const fechaFormateada = dia + "/" + mes + "/" + anio;
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


  const handleInputPad = (event) => {
    setPadecimientos(event.target.value);
  }

  const handleInputAlergias = (event) => {
    setAlergias(event.target.value);
  }

  const handleInputSangre = (event) => {
    setSangre(event.target.value);
  }



    //hooks de inputsConsulta
    const handleTemp = (event) => {
      setTemp(event.target.value);
    }
  
    const handleFc = (event) => {
      setFc(event.target.value);
    }
  
    const handlePresion = (event) => {
      const nuevaPresion = event.target.value.replace('/', '-');
      console.log(nuevaPresion);
      setPresion(event.target.value);
    }
    const handleFr = (event) => {
      setFr(event.target.value);
    }
    const handleSos = (event) => {
      setSos(event.target.value);
    }
    const handleMedic = (event) => {
      setMedic(event.target.value);
    }
    const handleMotivo = (event) => {
      setMotivo(event.target.value);
    }
    const handleRecom = (event) => {
      setRecom(event.target.value);
    }
    const handleGlucosa = (event) => {
      setGlucosa(event.target.value);
    }
  
  //ID - > es el id de usuario
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> RETURN () 
  return (
    <body>
      <div className="left-panel">
        <img src={logo} className='logo' />
        <div className='contTitleLeft' >
          <label className='labelPanelLeft'>Nueva consulta médica</label>
          <div className='line'></div>
        </div>

        <div className='contMenu' >
          <div className='optionBtn' >
            <label className='txtBTN' onClick={Regresar}>Regresar</label>
          </div>
        </div>
        <div className='contentImage'>
          <img src={imagen} className='imagen' />
        </div>
      </div>

      <div className="right-panel">
        <div className="right-panel-content">

          <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Información personal </animated.h1>
            <h1>{ID_Personal}</h1>
            <h1>{ID_User}</h1>
            <h1>{Nombre}</h1>
            <br></br>
            <br></br>
            <div className='containerInputLabel'>
              <label className='labelInput'>Motivo de consulta:</label>

              <input type="text" className="inputGlobal" placeholder="Motivo de la consulta" value={motivo} onChange={handleMotivo} onInput={handleInput} required />
              
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Presion Arterial (mmHg):</label>
              <input type="text" className="inputGlobal" placeholder="Presion Arterial (mmHg)" value={presion} onChange={handlePresion} required />
            </div>


            <div className='containerInputLabel'>
              <label className='labelInput'>Frecuencia Cardíaca:</label>
              <input type="number" className="inputGlobal" placeholder="Frecuencia Cardíaca" value={fc} onChange={handleFc} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Frecuencia Respiratoria:</label>
              <input type="number" className="inputGlobal" placeholder="Frecuencia Respiratoria" value={fr} onChange={handleFr} onInput={handleInput} required />
            </div>
            <div className='containerInputLabel'>
              <label className='labelInput'>Sat. Oxígeno en la sangre (%):</label>
              <input type="number" className="inputGlobal" placeholder="Sat. Oxígeno en la sangre (%)" value={sos} onChange={handleSos} onInput={handleInput} required />
            </div>
            <div className='containerInputLabel'>
              <label className='labelInput'>Glucosa (mg/dL):</label>
              <input type="number" className="inputGlobal" placeholder="Glucosa (mg/dL)" value={glucosa} onChange={handleGlucosa} onInput={handleInput} required />
            </div>
            <div className='containerInputLabel'>
              <label className='labelInput'>Medicamentos:</label>
              <input type="text" className="inputGlobal" placeholder="Medicamentos" value={medic} onChange={handleMedic} onInput={handleInput} required />
            </div>
           
            <div className='containerInputLabel'>
              <label className='labelInput'>Recomendaciones:</label>
              <input type="text" className="inputGlobal" placeholder="Recomendaciones" value={recom} onChange={handleRecom} onInput={handleInput} required />
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

export default ModuleSaludNewConsultaForm;