

import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import {NuevaConsulta} from '../../services/firebasePsicologia';

import firebase from "../../firebase";

const AddAsistenciaUser = ({ id }) =>  {


  const handleInput = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };
  

  const [id, setId] = useState(null);
  //cargar el id
  useEffect(() => {
    firebase.ref('/UltimosUsuarios/Psicologia').once('value').then((snapshot) => {
      const valor  = snapshot.val(); //obtiene el value del ultimo user activo
      setId(valor);
    });
    
    //alert();
  }, []);



 

    //----------------------------navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/psicologia-Dashboard");
    }
    


  //---------------------------------guardar en firebase 

  const [motivo, setMotivo] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [recomendaciones, setRecom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    NuevaConsulta(motivo, objetivos, recomendaciones);/*se agrega a firebase*/
    navigate("/psicologia-Dashboard");
  }



  const handleInputMotivo = (event) => {
    setMotivo(event.target.value);
  }

  const handleObje = (event) => {
    setObjetivos(event.target.value);
  }
  const handleRecom = (event) => {
    setRecom(event.target.value);
  }



    return (
        <div>
            

            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Registre sus datos</h1>
                    <input type="number" className="" placeholder="ID_USUARIO" value={id} disabled />
                    
                    
                    <input type="text" className="" placeholder="Motivo de consulta" value={motivo} onChange={handleInputMotivo} onInput={handleInput} required />
                    <textarea type="text" className="" placeholder="Objetivos terapeuticos" value={objetivos} onChange={handleObje} onInput={handleInput} required />
                    <textarea type="text" className="" placeholder="Recomendaciones" value={recomendaciones} onChange={handleRecom} onInput={handleInput} required />
                    
                 
                    <input type="submit" />
                </form>
                <input type="button" className="" value="Volver al dashboard " onClick={regresar} />
            </div>
       
        </div>
    );

}

export default AddAsistenciaUser;