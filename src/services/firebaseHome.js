import firebase from "../firebase";


const obtenerDatosDeFirebase = (callback) => {
    try {
      firebase.database().ref('/Config/UserNum').on('value', (snapshot) => {
        callback(snapshot.val());
        console.log(snapshot.val());  
    });
    } catch (error) {
      console.log(error);
      callback(null);
    }
  }


    export {obtenerDatosDeFirebase};