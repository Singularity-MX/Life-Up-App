
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';

import {addNuevoPaciente, showAlertNewPacient, addUserActive} from '../../services/firebaseSalud';


function Salud_dashboard() {


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
        <div>
            <h1>Dashboard salud</h1>
            <div className="">
                <h1>Form nuevo paciente</h1>
                <input type="text" value={selectedRowId} onChange={handleInputChange} readOnly disabled />
                
                <button onClick={handleButtonClick}>Aceptar</button>

              
                <input type="button" className="" value="Volver al home " onClick={regresar} />
            </div>

            {visible && (<div>
                <input type="button" className="" value="Expediente nuevo" onClick={Formulario} />
                <input type="button" className="" value="Crear consulta medica" onClick={Consulta} />
            </div>
            )}







            <div>

                <div>
                    <table>
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

            </div>
        </div>
    );

}

export default Salud_dashboard;