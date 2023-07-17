

/*Funciones importadas*/

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import backendUrl from '../../../serverConfig';
import "./styleAdd.css";
import { useSpring, animated } from 'react-spring';
import logo from '../../../GlobalStyles/images/logo.svg';
import imagen from '../../../GlobalStyles/images/image1.png';
import Swal from 'sweetalert2';
import { FaCheck } from 'react-icons/fa';




/*----------------------------  FUNCION PRINCIPAL  ---------------------------------- */

const Form_user_contacto = () => {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  //Función que permite escribir en mayusculas solamente.
  const handleInput = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };

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
  const ID_recibido = routeLocation.state && routeLocation.state.ID_USER;

  const [centroID, setCentro] = useState('');
  //nunmero de usuarios
  const [ultimoUserNum, setNumUs] = useState('');

  const [año, setAño] = useState('');


  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {

    //variables de base de datos
    const UserID = ID;
    const CentroID = centroID;
    const Nombre = nombre;
    const ApellidoPaterno = ap;
    const ApellidoMaterno = am;
    const Edad = edad;
    const Telefono = tel;

    const User_ID = UserID;

    const formData = {
      UserID,
      CentroID,
      Nombre,
      ApellidoPaterno,
      ApellidoMaterno,
      Edad,
      Telefono
    };


    const Data = {
      Indice,
      User_ID
    }


    // Enviar los datos al servidor utilizando Axios
    axios.post(backendUrl + '/api/addInformationPersonalUser', formData)
      .then(response => {
        // Manejar la respuesta del servidor si es necesario

        if (response.status === 200) {
          // Autenticación exitosa, puedes redirigir al usuario a otra página
          //Alerta(icono, titulo, texto) ('Inicio de sesión exitoso');
          //            navigate("/loader-DashboardSU");

          //navigate("/loader-DashboardSU");


          // increment a user
          axios.post(backendUrl + '/api/IncrementUSerNum', Data)
            .then(response => {
              // Manejar la respuesta del servidor si es necesario
              console.log(response.data);
              if (response.status === 200) {
                // Autenticación exitosa, puedes redirigir al usuario a otra página
                //Alerta(icono, titulo, texto) ('Inicio de sesión exitoso');
                //            navigate("/loader-DashboardSU");
                Alerta('success', 'Completado', 'Se ha registrado correctamente');
                navigate('/MenuUsers', { state: { ID_PERSONAL: ID_Personal } });
              } else {
                // Autenticación fallida
                Alerta('error', 'Sin éxito', 'Falló al registrar la información');
              }
            })
            .catch(error => {
              // Manejar errores si ocurre alguno
              console.error(error);
            });




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

  //-----Funciones para establecer los valores a las declaraciones de estados
  const handleInputNombre = (event) => { setNombre(event.target.value); }
  const handleInputAp = (event) => { setAp(event.target.value); }
  const handleInputAm = (event) => { setAm(event.target.value); }
  const handleInputEdad = (event) => { setEdad(event.target.value); }
  const handleInputSexo = (event) => { setSexo(event.target.value); }
  const handleInputTel = (event) => { setTel(event.target.value); }

  let navigate = useNavigate();
  let [email, setEmail] = useState("");

  function CrearID(idCentro, indice, ultimosDigitosAño) {
    
    
    //id de personal = ID_Centro + P + Año + Numero de usuario
    const ID = idCentro + "U" + ultimosDigitosAño + indice;
    setID(ID);
  }

  const fetchCentro = async () => {


  };

  useEffect(() => {
    const currentDate = new Date();
    setAño(currentDate.getFullYear()  % 100)
    const ID_generado ="";
    //-----------------------------------------------> Obtener el numero de usuarios
    const fetchNumUser = async () => {
      try {
        const response = await fetch(backendUrl + '/api/GetNumUser');
        const responseData = await response.json();
        if (response.ok) {
          const numUs = responseData.Indice; // Reemplaza "numUs" con el nombre de la propiedad adecuada en "responseData"
          setNumUs(numUs);//obten el numero de usuario ultimo
          setIndice(numUs+1);

          //crear id

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
              setID(idCentro + "U" + (currentDate.getFullYear()  % 100) + (numUs+1));
              //alert(ID)
              
              //CrearID(idCentro, Indice);
              //crear id

              //

             

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

  const Home = () => { 
    navigate("/loader-Home");
  }

  const Regresar = () => {
    navigate(-1);
  }

  //ID - > es el id de usuario
  //------------------------------------------------------------ >  RETURN()
  return (
    <body>
      <div className="left-panel">
        <img src={logo} className='logo' />
        <div className='contTitleLeft' >
          <label className='labelPanelLeft'><strong>Secciones completadas</strong></label>
          <div className='line'></div>
        </div>
        
        <label className='txtBTN' ><FaCheck /> Información personal</label>
        
        <label className='txtBTN' >Sección pendiente</label>
        <label className='txtBTN' >Sección pendiente</label>
        <label className='txtBTN' >Sección pendiente</label>
        <div className='contMenu' >
        

        </div>
        <div className='contentImage'>
          <img src={imagen} className='imagen' />
        </div>
      </div>




      <div className="right-panel">
        <div className="right-panel-content">
          <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Información de contacto</animated.h1>
        <h1>{ID_recibido}</h1>
            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el nombre:</label>
              <input type="text" class="inputGlobal" placeholder="Nombre(s)" value={nombre} onChange={handleInputNombre} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el Apellido Paterno:</label>
              <input type="text" class="inputGlobal" placeholder="Apellido Paterno" value={ap} onChange={handleInputAp} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el Apellido Materno:</label>
              <input type="text" class="inputGlobal" placeholder="Apellido Materno" value={am} onChange={handleInputAm} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa su edad:</label>
              <input type="number" class="inputGlobal" placeholder="Edad" value={edad} onChange={handleInputEdad} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Selecciona el sexo:</label>
              <select name="select" className="inputGlobal" value={sexo} onChange={handleInputSexo} required>
                <option value="" selected>Seleccionar Sexo</option>
                <option value="Masculino" >Masculino</option>
                <option value="Femenino" >Femenino</option>
              </select>
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa su teléfono(a 10 dígitos):</label>
              <input type="number" class="inputGlobal" placeholder="Teléfono a 10 dígitos" value={tel} onChange={handleInputTel} onInput={handleInput} pattern="[0-9]{10}" required />
            </div>

            <button type="submit" className='buttonPrincipalGlobal' onClick={handleSubmit} >Siguiente</button>




          </div>
        </div>

      </div>










      <div className="">



      </div>


    </body>
  );

}

export default Form_user_contacto;