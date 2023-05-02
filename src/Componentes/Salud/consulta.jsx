

import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { addNuevoPaciente, showAlertNewPacient, NuevaConsulta } from '../../services/firebaseSalud';
import './styleFormConsulta.css';
import firebase from "../../firebase";
import Header from '../Header';
import imgImageForm from './images/consultaIMG.png';
const Form_consulta = () => {
  //Función que permite escribir en mayusculas solamente.
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
    //alert();
  }, []);

  //----------------------------navigate
  let navigate = useNavigate();

  const regresar = () => {
    navigate("/saludDashboard");
  }




  //---------------------------------guardar en firebase 
  // variables
  const [temp, setTemp] = useState('');
  const [fc, setFc] = useState('');
  const [presion, setPresion] = useState('');
  const [fr, setFr] = useState('');
  const [sos, setSos] = useState('');
  const [medic, setMedic] = useState('');
  const [motivo, setMotivo] = useState('');
  const [recom, setRecom] = useState('');
  const [glucosa, setGlucosa] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    NuevaConsulta(temp, fc, fr, presion, sos, medic, motivo, recom, glucosa);//set en firebase

    showAlertNewPacient();
    navigate("/saludDashboard");
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


  return (
    <div className="containerBody_SaludConsulta">

      <Header texto="CREAR UN NUEVO EXPENDIENTE" />

      <div className="containerFormulario_SaludConsulta">
        <img className="imageLateralConsulta" src={imgImageForm}></img>
        <form onSubmit={handleSubmit} className="Formulario_SaludConsulta">
          <div className="containerTitleFormulario_SaludConsulta"><h1 className="title-form">NUEVA CONSULTA MÉDICA</h1></div>
          <input type="number" className="inputsConsulta" placeholder="ID_USUARIO" value={id} disabled />

          <input type="text" className="inputsConsulta" placeholder="Motivo de la consulta" value={motivo} onChange={handleMotivo} onInput={handleInput} required />
          <input type="text" className="inputsConsulta" placeholder="Presion Arterial (mmHg)" value={presion} onChange={handlePresion} required />
          <input type="number" className="inputsConsulta" placeholder="Temperatura Corporal (C°)" value={temp} onChange={handleTemp} required />
          <input type="number" className="inputsConsulta" placeholder="Frecuencia Cardíaca" value={fc} onChange={handleFc} onInput={handleInput} required />
          <input type="number" className="inputsConsulta" placeholder="Frecuencia Respiratoria" value={fr} onChange={handleFr} onInput={handleInput} required />
          <input type="number" className="inputsConsulta" placeholder="Sat. Oxígeno en la sangre (%)" value={sos} onChange={handleSos} onInput={handleInput} required />
          <input type="number" className="inputsConsulta" placeholder="Glucosa (mg/dL)" value={glucosa} onChange={handleGlucosa} onInput={handleInput} required />
          <input type="text" className="inputsConsulta" placeholder="Medicamentos" value={medic} onChange={handleMedic} onInput={handleInput} required />
          <input type="text" className="inputsConsulta" placeholder="Recomendaciones" value={recom} onChange={handleRecom} onInput={handleInput} required />

          <input type="submit" className="btnConsulta" />
          <input type="button" className="btn-VolverConsulta" value="Volver al dashboard " onClick={regresar} />
        </form>

      </div>

    </div>
  );

}

export default Form_consulta;