

import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import {addNuevoPaciente, showAlertNewPacient} from '../../services/firebaseSalud';

import firebase from "../../firebase";

const Form_salud = () =>  {
  
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

  const [padecimientos, setPadecimientos] = useState('');
  const [alergias, setAlergias] = useState('');
  const [sangre, setSangre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addNuevoPaciente(padecimientos, alergias, sangre);/*se agrega a firebase*/
    
    showAlertNewPacient();
    navigate("/saludDashboard");
  }


  const handleInputPad = (event) => {
    setPadecimientos(event.target.value);
  }

  const handleInputAlergias = (event) => {
    setAlergias(event.target.value);
  }

  const handleInputSangre = (event) => {
    setSangre(event.target.value);
  }


    return (
        <div>
            

            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Registre sus datos</h1>
                    <input type="number" className="" placeholder="ID_USUARIO" value={id} disabled />
                    <input type="text" className="" placeholder="Padecimientos crónicos"  value={padecimientos} onChange={handleInputPad} required/>
                    <input type="text" className="" placeholder="Alergias" value={alergias} onChange={handleInputAlergias} required />
                    <select name="select" className="" value={sangre} onChange={handleInputSangre} required>
                        <option value="Tipo A-">Tipo A+</option>
                        <option value="Tipo A-" >Tipo A-</option>
                        <option value="Tipo B+" >Tipo B+</option>
                        <option value="Tipo AB+" >Tipo AB+</option>
                        <option value="Tipo AB-" >Tipo AB-</option>
                        <option value="Tipo O+" >Tipo O+</option>
                        <option value="Tipo O-" >Tipo O-</option>
                    </select>
                    <input type="submit" />
                </form>
                <input type="button" className="" value="Volver al dashboard " onClick={regresar} />
            </div>
       
        </div>
    );

}

export default Form_salud;