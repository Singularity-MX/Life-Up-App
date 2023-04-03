import React from "react";
import './header.css';
import lifeUpLogo from './images/lifeUp.svg'
export function Header(props) {
    return (
        <header className="header">
            <img className="lifeUpLogo" src={lifeUpLogo} alt="Logo Life Up"/>
            <h1 className="title">{props.texto}</h1>
        </header>

    );
}

export function Loader() {
    return (
        <div className="preload">
            <div class="boxes">
                <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}


export default Header;
