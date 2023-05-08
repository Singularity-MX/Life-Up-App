

import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';

import {addNuevoPaciente, showAlertNewPacient, addUserActive} from '../../services/firebaseSalud';

import QRGenerator from './QR';

import TargestSalud from "./targetsSalud";
import TargetPersonal from "./targetInfoPersonal";
import TargetPsico from "./targetPsicologia";
//funcion qr
import Menu from '../MenuLateral';
import Header from '../Header';
import './buscarUserStyle.css'

function DashboardBuscar() {

    //qr
    const [valueQR, setValueQR] = useState('');

    function handleChange(event) {
      setValueQR(event.target.value);
    }
  

    //navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/loader-Home");
    }
    const Formulario = () => {
        navigate("/formSalud");
    }
    const Consulta = () => {
        navigate("/formConsulta");
    }

    
    //------------------------ocultar form
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };






    //click en fila

    const [selectedRowId, setSelectedRowId] = useState(null);


    //leer datos de firebas3
    const [data, setData] = useState([]);

    useEffect(() => {
        let newID = "";
        const id_user = firebase.ref("/User");
        id_user.on('value', snapshot => {
            const firebaseData = snapshot.val();
            const dataArray = [];
            for (let key in firebaseData) {
                dataArray.push({ id: key, ...firebaseData[key] });

            }
            setData(dataArray);
        });



    }, []);





//validar si ya clickeo en una fila
function handleInputChange(event) {
    setSelectedRowId(event.target.value);
  }

  function handleButtonClick() {
    if(selectedRowId != null){
        toggleVisible(); //hacer visble los btns
        addUserActive(parseInt(selectedRowId));//insert a firebase el id activo
    }
    else{
        //alert de que input esta vacio
        Swal.fire(
            'Error!',
            'Por favor da click en un usuario de la tabla',
            'error'
          )
    }
    
  }






    //----------------------------------------------------------render
    return (
        <div className="cont_bodyUser">
            <Header texto="DASHBOARD USUARIOS"/>
            
            <div className="cont_Buttons">
                <h1>USUARIOS DASHBOARD</h1>
                <input type="text" classname='inputsPsico' value={selectedRowId} onChange={handleInputChange} readOnly disabled />
                
                <button onClick={handleButtonClick}  className="btn" >Crear QR</button>

              
                <input type="button"  className="btn" value="Volver al home " onClick={regresar} />
            </div>

            {visible && (<div className="cont_QR">
                <div>
      <QRGenerator value={selectedRowId} className="qr_image"/>
      

      <button class="button" type="button">
  <span class="button__text">Download</span>
  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
</button>
            </div>
            </div>
            )}







            

                <div className="cont_table">
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>ID USER</th>
                                <th>NOMBRE</th>
                                <th>APELLIDO PATERNO</th>
                                <th>APELLIDO MATERNO</th>
                                <th>EDAD</th>
                                <th>SEXO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} onClick={() => setSelectedRowId(item.id)} >

                                    <td>{item.id}</td>
                                    <td>{item.InfoPersonal.Nombre}</td>
                                    <td>{item.InfoPersonal.AP}</td>
                                    <td>{item.InfoPersonal.AM}</td>
                                    <td>{item.InfoPersonal.Edad}</td>
                                    <td>{item.InfoPersonal.Sexo}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

            


            
            <TargetPersonal id={selectedRowId} />

            <TargestSalud id={selectedRowId} />

            <TargetPsico id={selectedRowId} />
        </div>
    );

}

export default DashboardBuscar;
