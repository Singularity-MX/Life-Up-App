

import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { addNuevoPaciente, showAlertNewPacient } from '../../services/firebaseSalud';
import imgImageForm from './images/expedienteImage.png';
import firebase from "../../firebase";
import './styleFormSalud.css';

import Menu from '../MenuLateral';
import Header from '../Header';

const Form_salud = () => {

  const [selectDesactivado, setSelectDesactivado] = useState(false);

  const [selectDesactivadoAlergias, setSelectDesactivadoAlergias] = useState(false);

  const handleInput = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };


  const [id, setId] = useState(null);
  //cargar el id
  useEffect(() => {
    firebase.ref('/UltimosUsuarios/Salud').once('value').then((snapshot) => {
      const valor = snapshot.val(); //obtiene el value del ultimo user activo
      setId(valor);
    });
    const select = document.getElementById('mi-select');
    select.disabled = selectDesactivado;

    const selectAlergias = document.getElementById('AlergiasInput');
    selectAlergias.disabled = selectDesactivadoAlergias;
    //alert();
  }, [selectDesactivado]);

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

  //----------------------------navigate
  let navigate = useNavigate();

  const regresar = () => {
    navigate("/saludDashboard");
  }



  //---------------------------------guardar en firebase 

  const [padecimientos, setPadecimientos] = useState('');
  const [alergias, setAlergias] = useState('');
  const [sangre, setSangre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addNuevoPaciente(padecimientos, alergias, sangre);/*se agrega a firebase*/

    showAlertNewPacient();
    navigate("/saludDashboard");
  }


  const handleInputPad = (event) => {
    setPadecimientos(event.target.value);
  }

  const handleInputAlergias = (event) => {
    setAlergias(event.target.value);
  }

  const handleInputSangre = (event) => {
    setSangre(event.target.value);
  }


  return (
    <div className="containerBody_SaludForm">
      
      <Header texto="CREAR UN NUEVO EXPENDIENTE" />

      <div className="containerFormulario_SaludForm">
        <img className="imageLateral" src={imgImageForm}></img>
        <form onSubmit={handleSubmit} className="Formulario_SaludForm">
          <div className="containerTitleFormulario_SaludForm"><h1 className="title-form">CREAR EXPEDIENTE</h1></div>
          <input type="number" className="inputs" placeholder="ID_USUARIO" value={id} disabled />

          <select name="select" id="mi-select" className="inputs" value={padecimientos} onChange={handleInputPad} required>
            <option value="">Seleccionar una opción</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hipertensión arterial" >Hipertensión arterial</option>
            <option value="Enfermedades cardiovasculares" >Enfermedades cardiovasculares</option>
            <option value="Enfermedad pulmonar obstructiva crónica " >Enfermedad pulmonar obstructiva crónica </option>
            <option value="Asma" >Asma</option>
            <option value="Artritis" >Artritis</option>
            <option value="Osteoporosis" >Osteoporosis</option>
            <option value="Trastornos de salud mental" >Trastornos de salud mental</option>
            <option value="Enfermedades renales crónicas" >Enfermedades renales crónicas</option>
            <option value="Cáncer" >Cáncer</option>
            <option value="Alzheimer y/u otras formas de demencia" >Enfermedad de Alzheimer y/u otras formas de demencia</option>
            <option value="Cirrosis" >Cirrosis</option>
            <option value="Hepatitis crónica" >Hepatitis crónica</option>
            <option value="Esclerosis múltiple" >Esclerosis múltiple</option>
            <option value="Fibromialgia " >Fibromialgia </option>
          </select>
          <label>
            <input type="checkbox" className="check" onChange={handleCheckboxChange} value={padecimientos} /> Sin padecimientos crónicos
          </label>
          <input type="text" id="AlergiasInput" className="inputs" placeholder="Alergias" value={alergias} onChange={handleInputAlergias} onInput={handleInput} required />

          <select name="select" className="inputs" value={sangre} onChange={handleInputSangre} required>
            <option value="">Selecciona tipo de sangre</option>
            <option value="Tipo A-">Tipo A+</option>
            <option value="Tipo A-" >Tipo A-</option>
            <option value="Tipo B+" >Tipo B+</option>
            <option value="Tipo AB+" >Tipo AB+</option>
            <option value="Tipo AB-" >Tipo AB-</option>
            <option value="Tipo O+" >Tipo O+</option>
            <option value="Tipo O-" >Tipo O-</option>
          </select>
          <input type="submit" className="btn"/>
          <input type="button" className="btn-Volver" value="Volver al dashboard " onClick={regresar} />
        </form>
        
      </div>

    </div>
  );

}

export default Form_salud;