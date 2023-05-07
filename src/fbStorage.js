import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
// Agrega tu configuración de Firebase aquí
apiKey: "AIzaSyD8hUqkLe_z2xBbt6HVGu9vEY1uho4OViw",
authDomain: "life-up-a1832.firebaseapp.com",
projectId: "life-up-a1832",
storageBucket: "life-up-a1832.appspot.com",
messagingSenderId: "981184071271",
appId: "1:981184071271:web:3d913cfaee461fe68976c2",
measurementId: "G-RXE56TBBRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
