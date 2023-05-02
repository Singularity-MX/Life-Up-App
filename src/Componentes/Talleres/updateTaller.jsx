

import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { AddTallerFirebase, UpdateTallerFirebase} from '../../services/firebaseTaller';
import Swal from 'sweetalert2';
import firebase from "../../firebase";
import Header from '../Header';
import './tallerDash.css';
import imgImageForm from './images/editIMG.png';

const ActualizarTaller = () => {

    const [verificaCheckbox, setVerifica] = useState(false);


    //click en fila

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [NuevoDias, setNuevo] = useState(null);
    const [visible, setVisible] = useState(false);
   

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

    function handleInputChange(event) {
        setSelectedRowId(event.target.value);
        
    }

   

    function CargarDatos(id, nombre, duracion, lugar, dias, hora, instructor) {
        setSelectedRowId(id);
        setNombre(nombre);
            setDuracion(duracion);
            setHora(hora);
            setInstructor(instructor);
            setLugar(lugar);
            //alert de que input esta vacio
          //setDiasSeleccionados(dias);
            
    }



    const [diasSeleccionados, setDiasSeleccionados] = useState([]);
    const handleInput = (event) => {
        event.target.value = event.target.value.toUpperCase();
    };

    function handleCheckboxChange(event) {
        setVerifica(true);
        const { value } = event.target;
        const index = diasSeleccionados.indexOf(value);
        if (index === -1) {
          setDiasSeleccionados([...diasSeleccionados, value]);
        } else {
          const newDiasSeleccionados = [...diasSeleccionados];
          newDiasSeleccionados.splice(index, 1);
          setDiasSeleccionados(newDiasSeleccionados);
          setSelectedRowId('');
        }

        
      }


      function handleDeseleccionar() {
        setDiasSeleccionados([]);
      }
      
    //----------------------------navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/dashboardTaller");
    }



    //---------------------------------guardar en firebase 
    const [modificacionDias, setMOD] = useState(false);
    const [diasFirebase, setDiasFB] = useState('');
    const [nombre, setNombre] = useState('');
    const [duracion, setDuracion] = useState('');
    const [lugar, setLugar] = useState('');
    const [instructor, setInstructor] = useState('');
    const [hora, setHora] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const stringConcatenado = diasSeleccionados.join(", ");
        console.log(stringConcatenado);
        
        if(verificaCheckbox==true){
            
            UpdateTallerFirebase(selectedRowId, nombre, duracion, lugar, instructor, stringConcatenado, hora);
            handleDeseleccionar();
        }
        else{
            firebase.ref('Actividades/Talleres/Registrados' + '/' + selectedRowId + '/Dias').once('value').then((snapshot) => {
                
                UpdateTallerFirebase(selectedRowId, nombre, duracion, lugar, instructor, snapshot.val(), hora);
            });
           
            
        }
    
       
     
          
       
        
        

        //navigate("/dashboardTaller");
    }



    const handleNombre = (event) => {
        setNombre(event.target.value);
    }

    const handleLugar = (event) => {
        setLugar(event.target.value);
    }
    const handleDuracion = (event) => {
        setDuracion(event.target.value);
    }
    const handleInstr = (event) => {
        setInstructor(event.target.value);
    }
    function handleTimeChange(event) {
        setHora(event.target.value);
    }
    function handleDias(event) {
        setNuevo(event.target.value);
        console.log(NuevoDias);
    }




    return (
        <div className="bodyContent">
        <div className="contenedorCompleto">
         
            <Header texto="DASHBOARD TALLERES"/>
            <div className="containerForm">
            <h2>TABLA DE TALLERES HABILITADOS </h2>
                <div className="containerOptions">
                   
                    
                    
            
                </div>

              
          
                

                <div className="table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID Taller</th>
                            <th>Nombre</th>
                            <th>Duracion</th>
                            <th>Lugar</th>
                            <th>Dias</th>
                            <th>Hora</th>
                            <th>Instructor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr className="fila" key={item.id} onClick={() => CargarDatos(item.id, item.Nombre, item.Duracion, item.Lugar, item.Dias, item.Hora, item.Instructor) } >

                                <td>{item.id}</td>
                                <td>{item.Nombre}</td>
                                <td>{item.Duracion}</td>
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
            <div className="containerOptions">
                   
                    
                   <div className="containerFormulario_SaludConsulta">
                   <img className="imageLateralConsulta" src={imgImageForm}></img>
                   <form onSubmit={handleSubmit} className="Formulario_SaludConsulta">
                       <div className="containerTitleFormulario_SaludConsulta"><h1 className="title-form">EDITAR TALLER</h1></div>
   
   
   
                       <input type="text" placeholder="ID DEL TALLER" className="inputsConsulta" value={selectedRowId} onChange={handleInputChange} readOnly disabled />
                       <input type="text" className="inputsConsulta" placeholder="Nombre" value={nombre} onChange={handleNombre} onInput={handleInput} required />
                       <input type="number" className="inputsConsulta" placeholder="DuraciÓn" value={duracion} onChange={handleDuracion} onInput={handleInput} required />
                       <input type="text" className="inputsConsulta" placeholder="Lugar" value={lugar} onChange={handleLugar} onInput={handleInput} required />
                       <input type="time" className="inputsConsulta" placeholder="Hora" value={hora} onChange={handleTimeChange} onInput={handleInput} required />
   
   
                       <div className="checksTeller">
   
   
                           <label>¿Que día se impartirá el taller?</label>
                           <label className="lblCHK"><input className="CHKtaller" type="checkbox" value="Lunes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Lunes')} /> Lunes</label>
                           <label className="lblCHK"><input type="checkbox" value="Martes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Martes')} /> Martes</label>
                           <label className="lblCHK"><input type="checkbox" value="Miércoles" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Miércoles')} /> Miércoles</label>
                           <label className="lblCHK"><input type="checkbox" value="Jueves" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Jueves')} /> Jueves</label>
                           <label className="lblCHK"><input type="checkbox" value="Viernes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Viernes')} /> Viernes</label>
                           <label className="lblCHK"><input type="checkbox" value="Sábado" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Sábado')} /> Sábado</label>
                           <label className="lblCHK"><input type="checkbox" value="Domingo" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Domingo')} /> Domingo</label>
   
                       </div>
   
                       <input type="text" className="inputsConsulta" placeholder="Instructor" value={instructor} onChange={handleInstr} onInput={handleInput} required />
                       <input type="submit" className="btnConsulta" />
                       <input type="button" className="btn-VolverConsulta" value="Volver al dashboard " onClick={regresar} />
                   </form>
   
               </div>
                   
                   </div>

        </div>
        </div>
    );

}

export default ActualizarTaller;


