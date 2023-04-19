
import React from "react";
import './Insertar.css';
import logo from '../images/Home/general.png';
import Header from "../Header";
import imagen from "../images/User_add/hogar.png";
/*Funciones importadas*/

function FormContacto(){
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
            <h1 className="title-form">Información de contacto</h1>
            <input type="text" className="txt-inputs" placeholder="Calle y número" />
            <input type="text" className="txt-inputs" placeholder="Colonia" />
            <input type="text" className="txt-inputs" placeholder="Código postal" />
            <input type="text" className="txt-inputs" placeholder="Ciudad" />
            <input type="text" className="txt-inputs" placeholder="Estado" />
            <button type="submit" className='btn-user'>Siguiente</button>
          </form>
        </div>
      </div>
    </div>

  </div>
);
}
export default FormContacto;