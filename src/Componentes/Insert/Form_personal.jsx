

import './Insertar.css';
import logo from '../images/Home/general.png';
import Header from "../Header";
import imagen from "../images/User_add/icon_inf general.png";
/*Funciones importadas*/

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {endSession, getSession, isLoggedIn} from "../../session";


/*imports para add */
import React, { Component } from "react";





import {addUserNew} from '../../services/firebaseAddUser';



/*---------------------FUNCION PRINCIPAL---------------------------------- */

const Form_personal = () => {

  const [nombre, setNombre] = useState('');
  const [ap, setAp] = useState('');
  const [am, setAm] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [tel, setTel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addUserNew(nombre,ap,am,edad,sexo,tel);/*se agrega a firebase*/
    console.log(ap);
    navigate("/addUserContacto");
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
  const handleInputEdad = (event) => {
    setEdad(event.target.value);
  }
  const handleInputSexo = (event) => {
    setSexo(event.target.value);

  }
  const handleInputTel = (event) => {
    setTel(event.target.value);
  }


  /*********fin eventos para guardar  */



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

    const addUser = () => {
      navigate("/addUserPersonal");
    }
    const Home = () => {
      navigate("/loader-Home");
    }
    const Siguiente = () => {
      navigate("/addUserContacto");
    }




//-----------------------------------return
  return (
    <div>
      <Header texto="REGISTRAR USUARIO" />
      <div className="contenedor-base">
        <div className="form-container">
          <div className="img-container">
            <div className="imgCont"><img src={imagen} className='img-form' /></div>
          </div>
          <div className="inputs-container">
            <form className="form-user" onSubmit={handleSubmit}>
              <h1 className="title-form">Información personal</h1>
              <input type="text" className="txt-inputs" placeholder="Nombre(s)" value={nombre} onChange={handleInputNombre} required/>
              <input type="text" className="txt-inputs" placeholder="Apellido Paterno" value={ap} onChange={handleInputAp} required/>
              <input type="text" className="txt-inputs" placeholder="Apellido Materno" value={am} onChange={handleInputAm} required/>
              <input type="number" className="txt-inputs" placeholder="Edad" value={edad} onChange={handleInputEdad} required/>
              <select name="select" className="txt-inputs" value={sexo} onChange={handleInputSexo} required>
                <option value="Masculino">Masculino</option>
                <option value="Femenino" >Femenino</option>
              </select>
              <input type="tel" className="txt-inputs" placeholder="Teléfono" value={tel} onChange={handleInputTel} required/>
              <button type="submit" className='btn-user' >Siguiente</button>
              <button type="button" className='btn-Cancelar' onClick={Home}>Cancelar</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Form_personal;