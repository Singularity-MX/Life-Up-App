
import React from "react";
import './Insertar.css';
import Header from "../Header";
import imagen from "../images/User_add/emergencia.png";
/*Funciones importadas*/
import {useEffect, useState} from "react";
import {addEmergencia} from '../../services/firebaseAddUser';
import {useNavigate} from "react-router-dom";

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
    navigate("/formFinal"); //sigue foto pero puse final por el momento
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
return(
    <div>
    <Header texto="REGISTRAR USUARIO" />
    <div className="contenedor-base">
      <div className="form-container">
        <div className="img-container">
          <div className="imgCont"><img src={imagen} className='img-form' /></div>
        </div>
        <div className="inputs-container">
          <form className="form-user" onSubmit={handleSubmit}>
            <h1 className="title-form">Información de emergencia</h1>
            <input type="text" className="txt-inputs" placeholder="Nombre(s)" value={nombre} onChange={handleInputNombre} onInput={handleInput} required/>
            <input type="text" className="txt-inputs" placeholder="Apellido Paterno" value={ap} onChange={handleInputAp} onInput={handleInput} required/>
            <input type="text" className="txt-inputs" placeholder="Apellido Materno" value={am} onChange={handleInputAm} onInput={handleInput} required/>
            <input type="tel" className="txt-inputs" placeholder="Teléfono" pattern="[0-9]{10}" value={tel} onChange={handleInputTel} onInput={handleInput} required/>
            <select name="select" className="txt-inputs" placeholder="Parentesco" value={parentesco} onChange={handleInputPar} required>
                <option value="" selected>Selecciona un parentesco</option>
                <option value="Hijo">Hijo/as</option>
                <option value="Hermano">Hermano/as</option>
                <option value="Nieto">Nieto/as</option>
                <option value="Biznieto">Biznieto/as</option>
                <option value="Conyuge">Conyuge</option>
              </select>
            <button type="submit" className='btn-user'>Siguiente</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
export default FormEmergencia;