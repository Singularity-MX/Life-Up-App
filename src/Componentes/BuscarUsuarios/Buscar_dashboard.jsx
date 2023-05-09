

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
import { toPng } from 'html-to-image';



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

  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = () => {
    const qrCanvas = document.getElementById("qr-canvas");
    toPng(qrCanvas)
      .then(function (dataUrl) {
        setDownloadUrl(dataUrl);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };



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
      <div className="QR" onClick={handleDownload}><QRGenerator value={selectedRowId} className="qr_image"/></div>
      

    
      {downloadUrl ? (
        <a href={downloadUrl} download="codigo-qr.png">
          Descargar
        </a>
      ) : null}



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
