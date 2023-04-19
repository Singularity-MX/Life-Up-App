
import React from "react";
import './Insertar.css';
import logo from '../images/Home/general.png';
import Header from "../Header";
import imagen from "../images/User_add/emergencia.png";
/*Funciones importadas*/

function FormEmergencia(){
return(
    <div>
    <Header texto="REGISTRAR USUARIO" />
    <div className="contenedor-base">
      <div className="form-container">
        <div className="img-container">
          <div className="imgCont"><img src={imagen} className='img-form' /></div>
        </div>
        <div className="inputs-container">
          <form className="form-user">
            <h1 className="title-form">Información de emergencia</h1>
            <input type="text" className="txt-inputs" placeholder="Nombre(s)" />
            <input type="text" className="txt-inputs" placeholder="Apellido Paterno" />
            <input type="text" className="txt-inputs" placeholder="Apellido Materno" />
            <input type="text" className="txt-inputs" placeholder="Teléfono" />
            <select name="select" className="txt-inputs" placeholder="Parentesco">
                <option value="value1">Masculino</option>
                <option value="value2">Femenino</option>
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