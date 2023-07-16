

/*Funciones importadas*/

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import backendUrl from '../../../serverConfig';

/*----------------------------  FUNCION PRINCIPAL  ---------------------------------- */

const Form_user_personal = () => {

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

  const [ID, setID] = useState('fsdf');

  const routeLocation = useLocation();
  const ID_Personal = routeLocation.state && routeLocation.state.ID_PERSONAL;

  const [centroID, setCentro] = useState('');
  //nunmero de usuarios
  const [ultimoUserNum, setNumUs] = useState('');

  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {


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

  function CrearID(idCentro, NumUsuario) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const lastTwoDigits = currentYear % 100;
    //id de personal = ID_Centro + P + Año + Numero de usuario
    const ID = idCentro + "U" + lastTwoDigits + (NumUsuario + 1);
    setID(ID);
  }

  const fetchCentro = async () => {
 
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
        CrearID(idCentro, ultimoUserNum);
      }
      // Verificar el estado de la respuesta

    } catch (error) {
      // Manejar errores de solicitud
      //setError('An error occurred');
    }
  };

  useEffect(() => {
    //-----------------------------------------------> Obtener el numero de usuarios
    const fetchNumUser = async () => {
      try {
        const response = await fetch(backendUrl + '/api/GetNumUser');
        const responseData = await response.json();
        if (response.ok) {
          const numUs = responseData.Indice; // Reemplaza "numUs" con el nombre de la propiedad adecuada en "responseData"
          setNumUs(numUs);//obten el numero de usuario ultimo
          fetchCentro();
          //crear id

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

  //ID - > es el id de usuario
  //------------------------------------------------------------ >  RETURN()
  return (
    <div className="containerBody_InsertUser">



      <div className="containerFormulario_InsertUser">

        <form onSubmit={handleSubmit} className="Formulario_PsicoForm">
          <h1>{ID}</h1>
          <h2>id personal: {ID_Personal}</h2>
          <h2>id personal: {ID}</h2>
          <div className="containerTitleFormulario_PsicoForm"><h1 className="title-form">INFORMACIÓN PERSONAL</h1></div>

          <input type="text" className="inputsPsico" placeholder="Nombre(s)" value={nombre} onChange={handleInputNombre} onInput={handleInput} required />
          <input type="text" className="inputsPsico" placeholder="Apellido Paterno" value={ap} onChange={handleInputAp} onInput={handleInput} required />
          <input type="text" className="inputsPsico" placeholder="Apellido Materno" value={am} onChange={handleInputAm} onInput={handleInput} required />
          <input type="number" className="inputsPsico" placeholder="Edad" value={edad} onChange={handleInputEdad} onInput={handleInput} required />
          <select name="select" className="inputsPsico" value={sexo} onChange={handleInputSexo} required>
            <option value="" selected>Seleccionar Sexo</option>
            <option value="Masculino" >Masculino</option>
            <option value="Femenino" >Femenino</option>
          </select>
          <input type="tel" className="inputsPsico" placeholder="Teléfono a 10 dígitos" value={tel} onChange={handleInputTel} onInput={handleInput} pattern="[0-9]{10}" required />
          <button type="submit" className='btn' >Siguiente</button>
          <button type="button" className='btn-Volver' onClick={Home}>Cancelar</button>

        </form>

      </div>

    </div>
  );

}

export default Form_user_personal;