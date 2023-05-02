

import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { AddTallerFirebase } from '../../services/firebaseTaller';

import firebase from "../../firebase";
import Header from '../Header';
import imgImageForm from './images/registroIMG.png';
import './tallerDash.css';

const AddTaller = () => {

    const [diasSeleccionados, setDiasSeleccionados] = useState([]);
    const handleInput = (event) => {
        event.target.value = event.target.value.toUpperCase();
    };


    function handleCheckboxChange(event) {
        const { value } = event.target;
        const index = diasSeleccionados.indexOf(value);
        if (index === -1) {
            setDiasSeleccionados([...diasSeleccionados, value]);
        } else {
            const newDiasSeleccionados = [...diasSeleccionados];
            newDiasSeleccionados.splice(index, 1);
            setDiasSeleccionados(newDiasSeleccionados);
        }
    }



    //----------------------------navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/dashboardTaller");
    }



    //---------------------------------guardar en firebase 

    const [nombre, setNombre] = useState('');
    const [duracion, setDuracion] = useState('');
    const [lugar, setLugar] = useState('');
    const [instructor, setInstructor] = useState('');
    const [hora, setHora] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const stringConcatenado = diasSeleccionados.join(", ");
        console.log(stringConcatenado);
        AddTallerFirebase(nombre, duracion, lugar, instructor, stringConcatenado, hora);

        navigate("/dashboardTaller");
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




    return (
        <div className="containerBody_SaludConsulta">

            <Header texto="CREAR UN NUEVO EXPENDIENTE" />

            <div className="containerFormulario_SaludConsulta">
                <img className="imageLateralConsulta" src={imgImageForm}></img>
                <form onSubmit={handleSubmit} className="Formulario_SaludConsulta">
                    <div className="containerTitleFormulario_SaludConsulta"><h1 className="title-form">AGREGAR TALLER</h1></div>
                    <input type="text" className="inputsConsulta" placeholder="Nombre" value={nombre} onChange={handleNombre} onInput={handleInput} required />
                    <input type="number" className="inputsConsulta" placeholder="Duración (Minutos)" value={duracion} onChange={handleDuracion} onInput={handleInput} required />
                    <input type="text" className="inputsConsulta" placeholder="Lugar" value={lugar} onChange={handleLugar} onInput={handleInput} required />
                    <input type="time" className="inputsConsulta" placeholder="Hora" value={hora} onChange={handleTimeChange} onInput={handleInput} required />



                    <div className="checksTeller">

                     
                        <label>¿Que día se impartirá el taller?</label>
                        <label className="lblCHK"><input className="CHKtaller" type="checkbox" value="Lunes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Lunes')} /> Lunes</label>
                        <label  className="lblCHK"><input type="checkbox" value="Martes" onChange={handleCheckboxChange} checked={diasSeleccionados.includes('Martes')} /> Martes</label>
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
    );

}

export default AddTaller;