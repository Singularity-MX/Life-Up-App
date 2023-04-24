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
