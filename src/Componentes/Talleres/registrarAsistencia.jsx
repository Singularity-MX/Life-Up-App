import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { Asistencia } from '../../services/firebaseTaller';
import Swal from 'sweetalert2';
import firebase from "../../firebase";
import Menu from '../MenuLateral';
import Header from '../Header';
import './tallerDash.css';

const RegistrarAsistencia = () => {


    const [talleres, setTalleres] = useState([]);


    //click en fila

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [data2, setData2] = useState(null);



    //leer datos de firebas3
    const [data, setData] = useState([]);

    const [usuarios, setUser] = useState([]);
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


        const dbRef = firebase.ref("Actividades/Talleres/Registrados");

        dbRef.on("value", (snapshot) => {
            const talleresArr = [];
            snapshot.forEach((childSnapshot) => {
                const taller = {
                    id: childSnapshot.key,
                    Nombre: childSnapshot.val().Nombre,
                    descripcion: childSnapshot.val().descripcion,
                    // Si hay subnodos dentro del id, puedes agregarlos aquí
                };
                talleresArr.push(taller);
            });
            setTalleres(talleresArr);
        });

        return () => dbRef.off();




        return () => {
            // Eliminar los listeners de Firebase cuando el componente se desmonta
            id_user.off();

        };
    }, []);


    function handleInputChange(event) {
        setSelectedRowId(event.target.value);

    }



    const handleInput = (event) => {
        event.target.value = event.target.value.toUpperCase();
    };


    //----------------------------navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/dashboardTaller");
    }


    const [selectedValue, setSelectedValue] = useState(""); // Estado para almacenar el valor seleccionado

    function handleSelectChange(event) {
        setSelectedValue(event.target.value); // Actualiza el estado con el valor seleccionado
        console.log(selectedValue);
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        Asistencia(selectedRowId, selectedValue);




        //navigate("/dashboardTaller");
    }


    return (
        <div className="bodyContent">
        <div className="contenedorCompleto">
           
            <Header texto="DASHBOARD TALLERES"/>
            <div className="containerForm">
            <h2>REGISTRAR ASISTENCIA</h2>
                <div className="containerOptions">
                   
                    
                    
                   
                <form onSubmit={handleSubmit}>
                        <h1></h1>


                        <input type="text" className="inputsConsulta" value={selectedRowId} onChange={handleInputChange} readOnly disabled />

                        <select onChange={handleSelectChange} className="inputsConsulta">
                            {talleres.map((taller) => (
                                <option key={taller.id} value={taller.id}>
                                    {taller.id} - {taller.Nombre}
                                </option>
                            ))}
                        </select>

                        <input type="submit" className="btn_Oculto" value="Registrar" />
                        <button className="btn_Oculto" onClick={regresar}>Regresar</button>
                    </form>


                    
                   
                </div>

              
          
                

                <div className="table_container">
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
                            <tr className="fila" key={item.id} onClick={() => setSelectedRowId(item.id)} >

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
        </div>
    );

}

export default RegistrarAsistencia;