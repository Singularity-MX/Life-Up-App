
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../fbStorage";
import { v4 } from "uuid";
import Header from "../Header";
import imagen from "../images/User_add/foto.png";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import {addReferenciaImagen} from '../../services/firebaseAddUser';

function Form_Foto() {

  let navigate = useNavigate();
 

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const [url, setUrl] = useState('');

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrl(snapshot.ref);
        //agregar ref a firebase y redirigir
        
        setImageUrls((prev) => [...prev, url]);
        addReferenciaImagen(url);
        showAlertFotos();
        
      });
    });
  }
  /*
  useEffect(() => {
   
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
*/



/*function para subir las fotos */
function showAlertFotos(){
  Swal.fire({
    title: 'Cargada con éxito',
    text: 'Espera un momento...',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500
})
navigate("/loader-Home");
}

  return (
    <div>
      <Header texto="REGISTRAR USUARIO" />
      <div className="contenedor-base">
        <div className="form-container">
          <div className="img-container">
            <div className="imgCont"><img src={imagen} className='img-form' /></div>
          </div>
          <div className="inputs-container">
            <div className="form-user">
              <h1 className="title-form">Fotografía</h1>
              <div className="parrafo"><p>A conituación puedes<strong> cargar una foto desde tú equipo local</strong> o si lo prefieres puedes <strong> utilzar tú cámara web para tomar una ahora.</strong></p></div>

            
            <input 
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />

            <button  className='btn'  onClick={uploadFile}> Upload Image</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Form_Foto;
