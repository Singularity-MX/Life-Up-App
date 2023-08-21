
import React from "react";

import Header from "../Header";
import imagen from "../images/User_add/emergencia.png";
/*Funciones importadas*/
import {useEffect, useState} from "react";
import {addEmergencia} from '../../services/firebaseAddUser';
import {useNavigate} from "react-router-dom";
import imgImageForm from './images/emergencia.png';

const FormEmergencia = () => {

  const handleInput = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };
  


  let navigate = useNavigate();

  //Declaraciones de estado para almacenar los datos del los inputs
  const [nombre, setNombre] = useState('');
  const [ap, setAp] = useState('');
  const [am, setAm] = useState('');
  const [tel, setTel] = useState('');
  const [parentesco, setPar] = useState('');

  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {
    event.preventDefault();
    addEmergencia(nombre, ap, am, tel, parentesco);/*se agrega a firebase*/
    navigate("/addUserFoto"); //sigue foto pero puse final por el momento /formFinal
  }

  const handleInputNombre = (event) => {
    setNombre(event.target.value);
  }
  const handleInputAp = (event) => {
    setAp(event.target.value);
  }
  const handleInputAm = (event) => {
    setAm(event.target.value);
  }
  const handleInputTel = (event) => {
    setTel(event.target.value);
  }
  const handleInputPar = (event) => {
    setPar(event.target.value);
  }

//------------------------------------------------------------ >  RETURN()
return (
  <div className="containerBody_InsertUser">
    
    <Header texto="CREAR UN NUEVO EXPENDIENTE" />

    <div className="containerFormulario_InsertUser">
      <img className="imageLateral" src={imgImageForm}></img>
      <form onSubmit={handleSubmit} className="Formulario_PsicoForm">
        <div className="containerTitleFormulario_PsicoForm"><h1 className="title-form">CONTACTO DE EMERGERNCIA</h1></div>
          
             
        <input type="text" className="inputsPsico" placeholder="Nombre(s)" value={nombre} onChange={handleInputNombre} onInput={handleInput} required/>
            <input type="text" className="inputsPsico" placeholder="Apellido Paterno" value={ap} onChange={handleInputAp} onInput={handleInput} required/>
            <input type="text" className="inputsPsico" placeholder="Apellido Materno" value={am} onChange={handleInputAm} onInput={handleInput} required/>
            <input type="tel" className="inputsPsico" placeholder="Teléfono" pattern="[0-9]{10}" value={tel} onChange={handleInputTel} onInput={handleInput} required/>
            <select name="select" className="inputsPsico" placeholder="Parentesco" value={parentesco} onChange={handleInputPar} required>
                <option value="" selected>Selecciona un parentesco</option>
                <option value="Hijo">Hijo/as</option>
                <option value="Hermano">Hermano/as</option>
                <option value="Nieto">Nieto/as</option>
                <option value="Biznieto">Biznieto/as</option>
                <option value="Conyuge">Conyuge</option>
              </select>
            <button type="submit" className='btn' >Siguiente</button>
          

      </form>
      
    </div>

  </div>
);
}
export default FormEmergencia;