import firebase from "../firebase";
import { storage } from '../firebase';

//ID CONSTRUCCION
//23->ULTIMAS CIFRAS DEL AÑO
//04->MES DE REGISTRO
//01->NUMERO DE USUARIO INCREMENTABLE

function construccionID(){
//Se crea el id user
const year = new Date().getFullYear().toString().slice(-2);//
const month = new Date().getMonth();
const day = new Date().getDay();
const id= year + month + day;
return id;
}

function addUserNew(Nombre, AP, AM, Edad, Sexo, Tel){
    //Se crea el id user
    const year = new Date().getFullYear().toString().slice(-2);//
    const month = new Date().getMonth();
    const day = new Date().getDay();
    let UserID=0;
    firebase.ref('/Config/UserNum').once('value').then((snapshot) => {
        const valor = snapshot.val();
        UserID = year + month + day + (valor+1);
        console.log(UserID);
        firebase.ref('/Config/UserNum').set(parseInt(valor+1));
        //se actualiza del contador

        //Se hace el registro set
        addPersonalInfo(UserID, Nombre, AP, AM, Edad, Sexo, Tel);
        console.log(Nombre);
      });
}

function addContacto(calle, col, cp, ciudad, estado){
    //Se crea el id user
   
    firebase.ref('/Config/UserNum').once('value').then((snapshot) => {
        const valor = snapshot.val();
        const ID = construccionID()+valor;
        console.log(ID);
        //Se hace el registro set
        addContactoInfo(ID, calle, col, cp, ciudad, estado);
      });
}

function addEmergencia(Nombre, AP, AM, Tel, Parentesco){
    //Se crea el id user
   
    firebase.ref('/Config/UserNum').once('value').then((snapshot) => {
        const valor = snapshot.val();
        const ID = construccionID()+valor;
        console.log(ID);
        //Se hace el registro set
        addEmergenciaInfo(ID, Nombre, AP, AM, Tel, Parentesco);
      });
}


//subir info al storage
function uploadFoto(archivo){
    const storage = firebase.storage();
    const storageRef = storage.ref();
    //generar ID

    const subirArchivoAFirebase = async (archivo) => {
        const referenciaStorage = storage().ref(); // Aquí se llama a la función storage()
        const referenciaArchivo = referenciaStorage.child(archivo.name);
        await referenciaArchivo.put(archivo);
        return referenciaArchivo.getDownloadURL();
      };
}





//---------------------------------------INSERTS DIRECTOS
//Add_Info personal
function addPersonalInfo(ID, Nombre, AP, AM, Edad, Sexo, Tel) {
    const bucket = "/User"; //nodo inicial
    firebase.ref(bucket+'/'+ID+'/InfoPersonal'+'/Nombre').set(Nombre); //Add Nombre
    firebase.ref(bucket+'/'+ID+'/InfoPersonal'+'/AP').set(AP); //Add AP
    firebase.ref(bucket+'/'+ID+'/InfoPersonal'+'/AM').set(AM); //Add AM
    firebase.ref(bucket+'/'+ID+'/InfoPersonal'+'/Edad').set(Edad); //Add Edad
    firebase.ref(bucket+'/'+ID+'/InfoPersonal'+'/Sexo').set(Sexo); //Add Sexo
    firebase.ref(bucket+'/'+ID+'/InfoPersonal'+'/Tel').set(Tel); //Add Tel
}
//Add_Info personal
function addContactoInfo(ID, calle, col, cp, ciudad, estado) {
    const bucket = "/User"; //nodo inicial
    firebase.ref(bucket+'/'+ID+'/InfoContacto'+'/Calle').set(calle); //Add calle
    firebase.ref(bucket+'/'+ID+'/InfoContacto'+'/Colonia').set(col); //Add col
    firebase.ref(bucket+'/'+ID+'/InfoContacto'+'/Cp').set(cp); //Add ciudad
    firebase.ref(bucket+'/'+ID+'/InfoContacto'+'/Ciudad').set(ciudad); //Add cp
    firebase.ref(bucket+'/'+ID+'/InfoContacto'+'/Estado').set(estado); //Add estado
    
}
//Add_Info emergencia
function addEmergenciaInfo(ID, Nombre, AP, AM, Tel, Parentesco) {
    const bucket = "/User"; //nodo inicial
    firebase.ref(bucket+'/'+ID+'/InfoEmergencia'+'/Nombre').set(Nombre); //Add calle
    firebase.ref(bucket+'/'+ID+'/InfoEmergencia'+'/Ap').set(AP); //Add col
    firebase.ref(bucket+'/'+ID+'/InfoEmergencia'+'/Am').set(AM); //Add ciudad
    firebase.ref(bucket+'/'+ID+'/InfoEmergencia'+'/Tel').set(Tel); //Add cp
    firebase.ref(bucket+'/'+ID+'/InfoEmergencia'+'/Parentesco').set(Parentesco); //Add estado
    
}


export {addPersonalInfo, addUserNew, addContactoInfo, addContacto, construccionID, addEmergenciaInfo, addEmergencia, uploadFoto};



