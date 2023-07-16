

/*Funciones importadas*/

import Header from "../Header";
import imagen from "../images/User_add/icon_inf general.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, isLoggedIn } from "../../session";
import { addUserNew } from '../../services/firebaseAddUser';
import imgImageForm from './images/icon_inf general.png';

/*----------------------------  FUNCION PRINCIPAL  ---------------------------------- */

const Form_personal = () => {

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

  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {
    event.preventDefault();
    addUserNew(nombre, ap, am, edad, sexo, tel); /*Función importada de Services:  firebasAddUser.js*/
    console.log(ap);
    navigate("/addUserContacto");
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

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
    let session = getSession();
    setEmail(session.email);
    console.log("Your access token is: " + session.accessToken);
  }, [navigate]);

  const Home = () => {
    navigate("/loader-Home");
  }

  //------------------------------------------------------------ >  RETURN()
  return (
    <div className="containerBody_InsertUser">
      
      <Header texto="CREAR UN NUEVO EXPENDIENTE" />

      <div className="containerFormulario_InsertUser">
        <img className="imageLateral" src={imgImageForm}></img>
        <form onSubmit={handleSubmit} className="Formulario_PsicoForm">
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

export default Form_personal;