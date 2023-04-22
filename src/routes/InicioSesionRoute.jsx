import {Alert, Box, Button, Container, Link, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signInUser} from "../firebase";
import {isLoggedIn, startSession} from "../session";


import InicioSesion from "../Componentes/Login/InicioSesion";

export default function InicioSesionRoute() {

  

  return (
    <div>
        <InicioSesion/>
    </div>
  )
}