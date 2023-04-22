import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
}

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
}