import React from "react";
import './header.css';

export function Header(props) {
    return (
        <div className="header">
            <div className="logo">
                <h1 className="title">{props.texto}</h1>
            </div>
        </div>

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
