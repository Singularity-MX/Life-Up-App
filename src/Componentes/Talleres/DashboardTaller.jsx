
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';


import Menu from '../MenuLateral';
import Header from '../Header';
import './tallerDash.css';

function TallerDashboard() {


    //navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/loader-Home");
    }
    const AddTaller = () => {
        navigate("/addTaller");
    }
    const Eliminar = () => {
       // addUserActive(selectedRowId);
        navigate("/deleteTaller");
    }
    const actualizar = () => {
        navigate('/ActualizarTaller');
    }
    const asistencia = () => {
        navigate('/AsistenciaTaller');
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
        const id_user = firebase.ref("/Actividades/Talleres/Registrados/");
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
        //addUserActive(parseInt(selectedRowId));//insert a firebase el id activo
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
        <div className="bodyContent">
        <div className="contenedorCompleto">
            <Menu />
            <Header texto="DASHBOARD TALLERES"/>
            <div className="containerForm">
            <h2>TABLA DE TALLERES HABILITADOS {selectedRowId}</h2>
                <div className="containerOptions">
                   
                    
                    
                   
                   


                    <button className="btn_Oculto" onClick={regresar}>Regresar</button>
                    <button className="btn_Oculto" onClick={AddTaller}>AGREGAR TALLER</button>
                <button className="btn_Oculto" onClick={Eliminar}>ELIMINAR TALLER</button>
                <button  className="btn_Oculto" onClick={actualizar}>EDITAL TALLER</button>
                <button className="btn_Oculto" onClick={asistencia}>REGISTRAR ASISTENCIA</button>
                </div>

              
          
                

                <div className="table_container">
                <table>
                        <thead>
                            <tr>
                                <th>ID Taller</th>
                                <th>Nombre del taller</th>
                                <th>Duración</th>
                                <th>Lugar</th>
                                <th>Días</th>
                                <th>Hora</th>
                                <th>Instructor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr className="fila" key={item.id} onClick={() => setSelectedRowId(item.id)} >

                                    <td>{item.id}</td>
                                    <td>{item.Nombre}</td>
                                    <td>{item.Duracion} Minutos</td>
                                    <td>{item.Lugar}</td>
                                    <td>{item.Dias}</td>
                                    <td>{item.Hora}</td>
                                    <td>{item.Instructor}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

            </div>
         

        </div>
        </div>
    );


}

export default TallerDashboard;






