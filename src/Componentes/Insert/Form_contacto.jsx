
import React from "react";
import './Insertar.css';
import logo from '../images/Home/general.png';
import Header from "../Header";
import imagen from "../images/User_add/hogar.png";
/*Funciones importadas*/
import {useNavigate} from "react-router-dom";
import {addContacto} from '../../services/firebaseAddUser';
import {useEffect, useState} from "react";


const FormContacto = () => {

  const [calle, setCalle] = useState('');
  const [col, setCol] = useState('');
  const [cp, setCp] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault();
    addContacto(calle, col, cp, ciudad, estado);/*se agrega a firebase*/
   navigate("/addUserEmergencia");
  }

  const handleInputCalle = (event) => {
    setCalle(event.target.value);
  }
  const handleInputCol = (event) => {
    setCol(event.target.value);
  }
  const handleInputCp = (event) => {
    setCp(event.target.value);
  }
  const handleInputCiudad = (event) => {
    setCiudad(event.target.value);
  }
  const handleInputEstado = (event) => {
    setEstado(event.target.value);
  }


  /**navigate */
  let navigate = useNavigate();

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
            <h1 className="title-form">Información de contacto</h1>
            <input type="text" className="txt-inputs" placeholder="Calle y número" value={calle} onChange={handleInputCalle} required/>
            <input type="text" className="txt-inputs" placeholder="Colonia" value={col} onChange={handleInputCol} required/>
            <input type="text" className="txt-inputs" placeholder="Código postal" value={cp} onChange={handleInputCp} required/>
            <input type="text" className="txt-inputs" placeholder="Ciudad" value={ciudad} onChange={handleInputCiudad} required/>
            <input type="text" className="txt-inputs" placeholder="Estado" value={estado} onChange={handleInputEstado} required/>
            <button type="submit" className='btn-user'>Siguiente</button>
            
          </form>
        </div>
      </div>
    </div>

  </div>
);
}
export default FormContacto;