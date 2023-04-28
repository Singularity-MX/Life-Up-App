import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import ErrorPage from "./error-page";

import Register from "./routes/register";
import User from "./routes/user";

import InicioSesionRoute from './routes/InicioSesionRoute';

//importar route home
import HomeRoute from "./routes/home";
import Loader from './Componentes/Loader/Loader';
import Form_personal from './Componentes/Insert/Form_personal';
import FormContacto from './Componentes/Insert/Form_contacto';
import FormEmergencia from './Componentes/Insert/Form_emergencia';
import Form_Foto from './Componentes/Insert/Form_foto';
import Form_final from './Componentes/Insert/Form_final';

//modulo de salud
import Salud_dashboard from './Componentes/Salud/Salud_home';
import Form_salud from './Componentes/Salud/form_captura';

//modulo psicologia
import PsicologiaDashboard from './Componentes/Psicologia/psicologiaDashboard';
import Form_psico from './Componentes/Psicologia/Form_psico';
import Form_consulta from './Componentes/Salud/consulta';

//buscvar user
import DashboardBuscar from './Componentes/BuscarUsuarios/Buscar_dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login"/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element:  <InicioSesionRoute/>,
  },
  {
    path: "/home",
    element: <HomeRoute/>,
  },
  {
    path: "/addUserPersonal",
    element: <Form_personal/>,
  },
  {
    path: "/addUserContacto",
    element: <FormContacto/>,
  },
  {
    path: "/addUserEmergencia",
    element: <FormEmergencia/>,
  },
  {
    path: "/addUserFoto",
    element: <Form_Foto/>,
  },
  {
    path: "/formFinal",
    element: <Form_final/>,
  },
//modulo de slaud
{
  path: "/saludDashboard",
  element: <Salud_dashboard/>,
},
{
  path: "/formSalud",
  element: <Form_salud/>,
},
{
  path: "/formConsulta",
  element: <Form_consulta/>,
},
//modulo psicologia
{
  path: "/psicologia-Dashboard",
  element: <PsicologiaDashboard/>,
},
{
  path: "/formPsico",
  element: <Form_salud/>,
},

//buscar usuarios
{
  path: "/BuscarUsuarioHome",
  element: <DashboardBuscar/>,
},

  /*--------------------------------------------------RUTAS PARA ACCESO CON LOADER*/
  {
    path: "/loader-Home",
    element:  <Loader to="/home" delay={2000} />,
  },
  {
    path: "/loader-Login",
    element:  <Loader to="/login" delay={3000} />,
  },



]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
