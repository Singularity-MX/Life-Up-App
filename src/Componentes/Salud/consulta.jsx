

import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import {addNuevoPaciente, showAlertNewPacient, NuevaConsulta} from '../../services/firebaseSalud';

import firebase from "../../firebase";

const Form_consulta = () =>  {
  
  const [id, setId] = useState(null);
  //cargar el id
  useEffect(() => {
    firebase.ref('/UltimosUsuarios/Salud').once('value').then((snapshot) => {
      const valor  = snapshot.val(); //obtiene el value del ultimo user activo
      setId(valor);
    });
    //alert();
  }, []);

    //----------------------------navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/saludDashboard");
    }
    



  //---------------------------------guardar en firebase 
// variables
  const [temp, setTemp] = useState('');
  const [fc, setFc] = useState('');
  const [presion, setPresion] = useState('');
  const [fr, setFr] = useState('');
  const [sos, setSos] = useState('');
  const [medic, setMedic] = useState('');
  const [motivo, setMotivo] = useState('');
  const [recom, setRecom] = useState('');
  const [glucosa, setGlucosa] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault();
    NuevaConsulta(temp, fc, fr, presion, sos, medic, motivo, recom, glucosa);//set en firebase
    
    showAlertNewPacient();
    navigate("/saludDashboard");
  }


  //hooks de inputs
  const handleTemp= (event) => {
    setTemp(event.target.value);
  }

  const handleFc = (event) => {
    setFc(event.target.value);
  }

  const handlePresion = (event) => {
    setPresion(event.target.value);
  }
  const handleFr = (event) => {
    setFr(event.target.value);
  }
  const handleSos = (event) => {
    setSos(event.target.value);
  }
  const handleMedic = (event) => {
    setMedic(event.target.value);
  }
  const handleMotivo = (event) => {
    setMotivo(event.target.value);
  }
  const handleRecom = (event) => {
    setRecom(event.target.value);
  }
  const handleGlucosa = (event) => {
    setGlucosa(event.target.value);
  }


    return (
        <div>
            

            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Nueva consulta</h1>
                    <input type="number" className="" placeholder="ID_USUARIO" value={id} disabled />

                    <input type="text" className="" placeholder="Motivo"  value={motivo} onChange={handleMotivo} required/>
                    <input type="text" className="" placeholder="Presion arterial"  value={presion} onChange={handlePresion} required/>
                    <input type="text" className="" placeholder="Temperatura Corporal" value={temp} onChange={handleTemp} required />
                    <input type="text" className="" placeholder="Frecuencia cardiaca" value={fc} onChange={handleFc} required />
                    <input type="text" className="" placeholder="frecuencia respiratoria" value={fr} onChange={handleFr} required />
                    <input type="text" className="" placeholder="sat. oxigeno en la sangre" value={sos} onChange={handleSos} required />
                    <input type="text" className="" placeholder="glucosa" value={glucosa} onChange={handleGlucosa} required />
                    <input type="text" className="" placeholder="medicamentos" value={medic} onChange={handleMedic} required />
                    <input type="text" className="" placeholder="Recomendaciones" value={recom} onChange={handleRecom} required />
                    

                    <input type="submit" />
                </form>
                <input type="button" className="" value="Volver al dashboard " onClick={regresar} />
            </div>
       
        </div>
    );

}

export default Form_consulta;