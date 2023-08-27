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
const ModuleTallerAddForm = () => {

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
  const numeroT = routeLocation.state && routeLocation.state.NumTaller;
  
  const [centroID, setCentro] = useState('');
  const [ultimoUserNum, setNumUs] = useState('');
  const [año, setAño] = useState('');
  let navigate = useNavigate();
  let [email, setEmail] = useState("");

  const [Fecha, setFecha] = useState('');

  const [IDTaller, setIdTaller] = useState('');


const [motivo, setMotivo]= useState("");
const [objetivos, setObjetivos]= useState("");
const [recomendaciones, setRecomendaciones]= useState("");




const [duracion, setDuracion] = useState('');
const [lugar, setLugar] = useState('');
const [instructor, setInstructor] = useState('');
const [hora, setHora] = useState('');


const [centros, setCentros] = useState([]);

const [ID_Centro, setCentroId] = useState('');

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


  
  const handleNombre = (event) => {
    setNombre(event.target.value);
}

const handleLugar = (event) => {
    setLugar(event.target.value);
}
const handleDuracion = (event) => {
    setDuracion(event.target.value);
}
const handleInstr = (event) => {
    setInstructor(event.target.value);
}
function handleTimeChange(event) {
    setHora(event.target.value);
}


const [diasSeleccionados, setDiasSeleccionados] = useState([]);



function handleCheckboxChange(event) {
    const { value } = event.target;
    const index = diasSeleccionados.indexOf(value);
    if (index === -1) {
        setDiasSeleccionados([...diasSeleccionados, value]);
    } else {
        const newDiasSeleccionados = [...diasSeleccionados];
        newDiasSeleccionados.splice(index, 1);
        setDiasSeleccionados(newDiasSeleccionados);
    }
}


  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {
//taller ID
    const Tallerid=ID_Centro+"T" + (numeroT+1);
    
    //eliminar comillas en dias
    const diasSinComillas = diasSeleccionados.join(',').replace(/'/g, ' ');

    //variables de base de datos

    const TallerID = Tallerid;
    const    Nombre	= nombre;
    const CentroID	= ID_Centro;
    const Instructor	= instructor;
   const Duracion	= duracion;
   const Dias	= diasSinComillas;
   const Hora	= hora;

    //construcción del formData
    const formData = {
      TallerID,
      Nombre,
      CentroID,
      Instructor,
      Duracion,
      Dias,
      Hora
    };


      axios.post(backendUrl + '/api/Taller-Insert-NewTaller', formData)
      .then(response => {
        if (response.status === 200) {             
          AlertaTimer('success', 'Información completada', 1000);
          navigate('/MenuTalleres' , { state: { ID_PERSONAL: ID_Personal } });
          
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
   


    const fetchCentro = async () => {
      try {
        const response = await fetch(backendUrl + '/api/GetCentros');
        const responseData = await response.json();
        if (response.ok) {
          setCentros(responseData);
        } else {
          console.error('Error al obtener los datos de usuarios');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error.message);
      }
    };
    //------------------------------------------------->obtener centro


   
    fetchCentro();
  }, [navigate]);


  const msgContenido = () => {

    
    
        let mensaje = "Nombre: " + nombre +
    " duracion: "+ duracion+
    " hora: "+hora+
    " Dias ( "+ diasSeleccionados +" ) "+
    " Instructor: " + instructor+
    " Centro : "+ ID_Centro +
    " ID: " ;
    Alerta('success', 'datos', mensaje);
  }





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
            <animated.h1 style={fade} className="titleForm">Agregar taller </animated.h1>
    <h1>{ID_Personal}</h1>
    <h1>{ID_User}</h1>
    <h1>{Nombre}</h1>
            <div className='containerInputLabel'>
              <label className='labelInput'>Nombre de taller:</label>
              <input type="text" class="inputGlobal" placeholder="Nombre" value={nombre} onChange={handleNombre} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Duración:</label>
              <input type="number" class="inputGlobal" placeholder="Duración (Minutos)" value={duracion} onChange={handleDuracion} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Hora:</label>
              <input type="time" class="inputGlobal" placeholder="Hora" value={hora} onChange={handleTimeChange} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Dias:</label>
              <label className="lblCHK"><input className="CHKtaller" type="checkbox" value="Lunes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Lunes')} /> Lunes</label>
                        <label  className="lblCHK"><input type="checkbox" value="Martes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Martes')} /> Martes</label>
                        <label className="lblCHK"><input type="checkbox" value="Miércoles" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Miércoles')} /> Miércoles</label>
                        <label className="lblCHK"><input type="checkbox" value="Jueves" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Jueves')} /> Jueves</label>
                        <label className="lblCHK"><input type="checkbox" value="Viernes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Viernes')} /> Viernes</label>
                        <label className="lblCHK"><input type="checkbox" value="Sábado" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Sábado')} /> Sábado</label>
                        <label className="lblCHK"><input type="checkbox" value="Domingo" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Domingo')} /> Domingo</label>
            </div>
            
            <div className='containerInputLabel'>
              <label className='labelInput'>Instructor:</label>
              <input type="text" class="inputGlobal" placeholder="Instructor" value={instructor} onChange={handleInstr} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
                <label className='labelInput'>Elige un centro:</label>

                <select class="inputGlobal" value={ID_Centro} onChange={e => setCentroId(e.target.value.split(" - ")[0])} required>
                  <option disabled selected value="">Seleccionar centro</option>
                  {centros.map(centro => (
                    <option key={centro.ID_Centro} value={centro.ID_Centro}>
                      {centro.ID_Centro} - {centro.Nombre}
                    </option>
                  ))}
                </select>
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

export default ModuleTallerAddForm;