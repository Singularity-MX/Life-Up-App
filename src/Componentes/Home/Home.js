import Menu from '../MenuLateral';
import Header from '../Header';
import Display from '../Home/Display_Home';

function Home(){

    return(
        <div>
            <Menu />
            <Header texto="Home"/>
            <Display />
        </div>
    );
}
export default Home;