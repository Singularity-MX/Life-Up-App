import './Display.css';
import general from '../images/Home/general.png';
import React from 'react';
import phil from '../images/Home/phil.png';
import medico from '../images/Home/medico.png';
import psicp from '../images/Home/psicologia.png';
import taller from '../images/Home/talleres.png';


function User() {
    return (
        <div className='container-info'>
            {/* Aqui es el panel derecho de la info de usuario */}
            <div className="content-title">
                <h5 className="titulo">Último registro realizado</h5>
            </div>

            <div className='conainer_header_user'>
                <div className='title-header'>
                    <img src={general} className='icon_info' />
                    <h3 className='title_user'>Información general</h3>
                </div>

                <div className='buttons-header'>
                    <div class="container-input">
                        <input type="text" placeholder="Usuario" name="text" class="input" />
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                        </svg>
                    </div>

                    <button>Buscar</button>
                </div>
            </div>

            <div className='container_info_user'>
                <img src={phil} className='IMG_USER' />
                <div className='info_value'>
                    <h1 className='titulo_nombre'>Jose Eduardo Perez Ruiz</h1>
                    <p className='txt_user_general'>Última asistencia: 29/03/20</p>
                    <p className='txt_user_general'>Usuario: 189245</p>
                    <p className='txt_user_general'>Edad: 89 años</p>
                </div>
            </div>

            <div className='container_info_adicional'>
                <div className='card_container'>
                    <div className='title_card'>
                        <img src={medico} className='icon_info' />
                        <h3 className='title_user'>Información general</h3>
                    </div>
                    <div className='card_info'>
                        <h3 className='title_card_info'>Última visita:</h3>
                        <p className='txt_card'>12/02/2023</p>
                        <h3 className='title_card_info'>Padecimientos crónicos:</h3>
                        <p className='txt_card'>Hipertensión</p>
                    </div>
                </div>

                <div className='card_container'>
                    <div className='title_card'>
                        <img src={psicp} className='icon_info' />
                        <h3 className='title_user'>Información general</h3>
                    </div>
                    <div className='card_info'>
                        <h3 className='title_card_info'>Última visita:</h3>
                        <p className='txt_card'>12/02/2023</p>
                        <h3 className='title_card_info'>Motivo general:</h3>
                        <p className='txt_card'>Depresión</p>
                    </div>
                </div>


                <div className='card_container'>
                    <div className='title_card'>
                        <img src={taller} className='icon_info' />
                        <h3 className='title_user'>Información general</h3>
                    </div>
                    <div className='card_info'>
                        <h3 className='title_card_info'>Última visita:</h3>
                        <p className='txt_card'>12/02/2023</p>
                        <h3 className='title_card_info'>Padecimientos crónicos:</h3>
                        <p className='txt_card'>Hipertensión</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default User;