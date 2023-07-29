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

//user
import Form_user_personal from './Componentes/Modulos/Usuarios/Insert/Form_personal';
import Form_user_contacto from './Componentes/Modulos/Usuarios/Insert/Form_contacto';
import Form_user_emergencia from './Componentes/Modulos/Usuarios/Insert/Form_emergencia';
import Form_user_photo from './Componentes/Modulos/Usuarios/Insert/Form_photo';
import Form_user_finally from './Componentes/Modulos/Usuarios/Insert/Form_finally';

//delete
import ModuleUserDelete from './Componentes/Modulos/Usuarios/Delete/Delete';

//modulo de salud
import Salud_dashboard from './Componentes/Salud/Salud_home';
import Form_salud from './Componentes/Salud/form_captura';
import Form_consulta from './Componentes/Salud/consulta';


//modulo psicologia
import PsicologiaDashboard from './Componentes/Psicologia/psicologiaDashboard';
import Consulta from './Componentes/Psicologia/NuevaConsulta';
import InfoPsico from './Componentes/Psicologia/infoPacientePsicologia';

//taller
import TallerDashboard from './Componentes/Talleres/DashboardTaller';
import AddTaller from './Componentes/Talleres/addTaller';
import TallerDelete from './Componentes/Talleres/deleteTaller';
import ActualizarTaller from './Componentes/Talleres/updateTaller';
import RegistrarAsistencia from './Componentes/Talleres/registrarAsistencia';

//buscvar user
import DashboardBuscar from './Componentes/BuscarUsuarios/Buscar_dashboard';

//estadis
import DashboardEstadistica from './Componentes/Estadistica/dashboardEstadistica';

//ADMIN SUPER USUARIOS
import LoginSU from './Componentes/AdminUsers/LoginSU';
import PanelAdmin from './Componentes/AdminUsers/PanelSU';
import Formulario from './Componentes/AdminUsers/addUser';
import DeleteUser from './Componentes/AdminUsers/DeleteUserForm';
import EditSuperUsuario from './Componentes/AdminUsers/EditUser';

//menus roles
import MenuAdmin from './Componentes/ROLES_MENU/Administracion/Dashboard_Admin';
import MenuPsico from './Componentes/ROLES_MENU/Psicologia/Dashboard_Psicologia';
import MenuUsers from './Componentes/Modulos/Usuarios/Menu-usuarios';

import MenuApplication from './Componentes/Menu/MenuApp';
import MenuPsicologia from './Componentes/Modulos/Psicologia/Menu-psicologia';
import MenuEnfermeria from './Componentes/Modulos/Enfermeria/Menu-enfermeria';
import MenuTalleres from './Componentes/Modulos/Talleres/Menu-talleres';
import MenuEstadistica from './Componentes/Modulos/Estadistica/Menu-estadistica';

//psico
import ModulePsicoNuevaConsultaID from './Componentes/Modulos/Psicologia/Consulta/NuevaConsultaForm1';
import ModulePsicoNuevaConsultaForm from './Componentes/Modulos/Psicologia/Consulta/NuevaConsultaForm2';
//widgets
import WidgetPersonalInformation from './Componentes/Modulos/Widgets/CardUserPersonal';
import TestWidgets from './Componentes/Modulos/Widgets/Graficos/testWidgets';

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
  ////////////////////////////////////-> usuarios modulo
  {
    path: "/addUserPersonal",
    element: <Form_user_personal/>,
  },
  {
    path: "/addUserContacto",
    element: <Form_user_contacto/>,
  },
  {
    path: "/addUserEmergencia",
    element: <Form_user_emergencia/>,
  },
  {
    path: "/addUserFoto",
    element: <Form_user_photo/>,
  },
  {
    path: "/formFinal",
    element: <Form_user_finally/>,
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
  path: "/consultaPsico",
  element: <Consulta/>,
},
{
  path: "/infoPsico",
  element: <InfoPsico/>,
},
//buscar usuarios
{
  path: "/BuscarUsuarioHome",
  element: <DashboardBuscar/>,
},

//taller
{
  path: "/dashboardTaller",
  element: <TallerDashboard/>,
},
{
  path: "/addTaller",
  element: <AddTaller/>,
},
{
  path: "/deleteTaller",
  element: <TallerDelete/>,
},
{
  path: "/ActualizarTaller",
  element: <ActualizarTaller/>,
},
{
  path: "/AsistenciaTaller",
  element: <RegistrarAsistencia/>,
},
//stats
{
  path: "/EstadisticaDash",
  element: <DashboardEstadistica/>,
},

// ADMIN SUIPER USUARIOS
{
  path: "/LoginSU",
  element: <LoginSU/>,
},

{
  path: "/DashboardRoles",
  element: <PanelAdmin/>,
  
},
{
  path: "/FormularioPersonal",
  element: <Formulario/>,
},
{
  path: "/DeleteUserPersonal",
  element: <DeleteUser/>,
},
{
  path: "/EditUserPersonal",
  element: <EditSuperUsuario/>,
},

///MENU ROLES DE USUARIOS
{
  path: "/MenuAdmin",
  element: <MenuAdmin/>,
},
{
  path: "/MenuPsico",
  element: <MenuPsico/>,
},




{
  path: "/MenuUsers",
  element: <MenuUsers/>,
},
{
  path: "/MenuApp",
  element: <MenuApplication/>,
},
{
  path: "/MenuPsicologia",
  element: <MenuPsicologia/>,
},
{
  path: "/MenuEnfermeria",
  element: <MenuEnfermeria/>,
},
{
  path: "/MenuTalleres",
  element: <MenuTalleres/>,
},
{
  path: "/MenuEstadistica",
  element: <MenuEstadistica/>,
},
{
  path: "/MouleUserDelete",
  element: <ModuleUserDelete/>,
},

///psico
{
  path: "/PsicologiaNewConsultID",
  element: <ModulePsicoNuevaConsultaID/>,
},
{
  path: "/Psicologia-NewConsult-Form",
  element: <ModulePsicoNuevaConsultaForm/>,
},

///////////////////////////////widgets
{
  path: "/testWidgetUserInfo",
  element: <WidgetPersonalInformation/>,
},
{
  path: "/testWidgets",
  element: <TestWidgets/>,
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
  {
    path: "/loader-DashboardSU",
    element:  <Loader to="/DashboardRoles" delay={1000} />,
  },
/*--------------------------------------------------rutas menu roles*/
  {
    path: "/loader-MenuAdmin",
    element:  <Loader to="/MenuAdmin" delay={1000} />,
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
