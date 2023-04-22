
import logo from './logo.svg';
import './App.css';

/*COMPONENTES BÁSICOS*/
import Login from './Componentes/Login/login';
import Header from './Componentes/Header';
import Home from './Componentes/Home/Home';

/*COMPONENTES DE AGREGAR USUARIOS */
import Form_personal from './Componentes/Insert/Form_personal'; 
import FormContacto from './Componentes/Insert/Form_contacto'; 
import FormEmergencia from './Componentes/Insert/Form_emergencia';
import Form_Foto from './Componentes/Insert/Form_foto';
import Form_final from './Componentes/Insert/Form_final';

/*COMPONENTES DE BÚSQUEDA */

function App() {
  return (
    <div className="App">
       
      <Login/>
    </div>
   
  );
}

export default App;
