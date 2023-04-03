
import logo from './logo.svg';
import './App.css';
/*Funciones importadas*/
import {Header, Loader} from "./Header";
import Login from './Login/login'

function App() {
  return (
    <div className="App">
       <Header texto="Inicia Sesión" />
       <Login />
    </div>
   
  );
}

export default App;
