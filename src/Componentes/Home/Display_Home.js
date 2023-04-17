import './Display.css';
import logo from '../images/lifeUp.svg';
import Graficos from './graficas';
import Usuarios from './Usuario';

//importar los componentes propios

function Display(){
    //Display para elementos de home
    return (
        <div className="container">
            <Graficos />
            <Usuarios />    

            
        </div>
    );
}

export default Display;