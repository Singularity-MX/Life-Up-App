import { useNavigate } from "react-router-dom";

function PsicologiaDashboard() {
   //navigate
   let navigate = useNavigate();

   const regresar = () => {
       navigate("/loader-Home");
     }
    return (
        <div>
            <input type="button" className="" value="Regresar a home" onClick={regresar} />
        </div>
    );

}

export default PsicologiaDashboard;