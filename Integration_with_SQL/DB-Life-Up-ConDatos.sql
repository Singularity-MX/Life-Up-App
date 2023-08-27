-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-08-2023 a las 18:35:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `life-up-db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `TallerID` varchar(20) NOT NULL,
  `UserID` varchar(20) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centros`
--

CREATE TABLE `centros` (
  `ID_Centro` varchar(10) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Direccion` text NOT NULL,
  `Delegacion` varchar(100) NOT NULL,
  `CodigoPostal` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `centros`
--

INSERT INTO `centros` (`ID_Centro`, `Nombre`, `Direccion`, `Delegacion`, `CodigoPostal`) VALUES
('CEDIF-01', 'Centro Gerontológico San Juan de Dios', 'Plaza Revolución 107, San Juan de Dios,  León, Gto', 'San Miguel', 37004),
('CEDIF-02', 'Sistema Nacional para el Desarrollo Integral de la Familia', 'Familia San Bruno 102, Jardines de Los Naranjos, Praderas de Santa Rosa, León, Gto', 'Coecillo', 37210),
('CEDIF-03', 'La Casa de los Abuelos', 'Juan Bautista La Salle 303, Panorama, León, Gto', 'Cerro Gordo', 37160);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactoemergencia`
--

CREATE TABLE `contactoemergencia` (
  `UserID` varchar(100) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `ApellidoPaterno` varchar(50) NOT NULL,
  `ApellidoMaterno` varchar(50) NOT NULL,
  `Telefono` int(100) NOT NULL,
  `Parentesco` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contactoemergencia`
--

INSERT INTO `contactoemergencia` (`UserID`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `Telefono`, `Parentesco`) VALUES
('CEDIF-01U232', 'FRANCISCO ', 'BLOCO', 'LESTE', 2147483647, 'Hermano'),
('CEDIF-01U233', 'JORGE', 'PEREZ', 'RAMIREZ', 2147483647, 'Nieto'),
('CEDIF-01U234', 'PEDRO', 'ORTIZ', 'RAMIREZ', 2147483647, 'Nieto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `UserID` varchar(100) NOT NULL,
  `Calle` varchar(50) NOT NULL,
  `Colonia` varchar(20) NOT NULL,
  `CodigoPostal` int(5) NOT NULL,
  `Delegacion` varchar(20) NOT NULL,
  `Ciudad` varchar(50) NOT NULL,
  `Estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direcciones`
--

INSERT INTO `direcciones` (`UserID`, `Calle`, `Colonia`, `CodigoPostal`, `Delegacion`, `Ciudad`, `Estado`) VALUES
('CEDIF-01U232', 'TRAVESSA #1211', 'CAMILO SANDOVAL', 37149, 'SAN MIGUEL', 'LEÓN', 'GUANAJUATO'),
('CEDIF-01U233', 'MADROÑO 129', 'SAN JERONIMO', 37134, 'SAN MIGUEL', 'LEÓN', 'GUANAJUATO'),
('CEDIF-01U234', 'COLORIN #489', 'SAN PIO', 37813, 'CERRO GORDO', 'LEÓN', 'GUANAJUATO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotouser`
--

CREATE TABLE `fotouser` (
  `UserID` varchar(100) NOT NULL,
  `FotoURL` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fotouser`
--

INSERT INTO `fotouser` (`UserID`, `FotoURL`) VALUES
('CEDIF-01U232', '1693151406654_persona1.jpg'),
('CEDIF-01U233', '1693151892630_persona2.jpg'),
('CEDIF-01U234', '1693152018898_persona3.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `numerousuarios`
--

CREATE TABLE `numerousuarios` (
  `Indice` int(11) NOT NULL,
  `User_ID` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `numerousuarios`
--

INSERT INTO `numerousuarios` (`Indice`, `User_ID`) VALUES
(1, 'INIT'),
(2, 'CEDIF-01U232'),
(3, 'CEDIF-01U233'),
(4, 'CEDIF-01U234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `PersonalID` varchar(20) NOT NULL,
  `Rol` varchar(50) NOT NULL,
  `ID_Centro` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(10000) NOT NULL,
  `Acceso` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`PersonalID`, `Rol`, `ID_Centro`, `Email`, `Password`, `Acceso`) VALUES
('CEDIF-01P232', 'Psicología', 'CEDIF-01', 'psicologia@dif.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'ÁREA DE PSICOLOGÍA'),
('CEDIF-01P233', 'Enfermería', 'CEDIF-01', 'enfermeria@dif.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'ÁREA DE ENFERMERÍA'),
('CEDIF-01P234', 'Instructor', 'CEDIF-01', 'instructora@dif.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'ÁREA DE TALLERES Y ACTIVIDADES'),
('CEDIF-01P235', 'Administración', 'CEDIF-01', 'administradora@dif.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'TODAS LAS ÁREAS'),
('CEDIF-01P236', 'Recepción', 'CEDIF-01', 'recepcionista@dif.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'ÁREA DE REGISTRO DE USUARIOS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `psicologia`
--

CREATE TABLE `psicologia` (
  `Numero` int(11) NOT NULL,
  `UserID` varchar(100) NOT NULL,
  `Motivo` varchar(50) NOT NULL,
  `Objetivos` text NOT NULL,
  `Recomendaciones` varchar(100) NOT NULL,
  `Fecha` varchar(15) NOT NULL,
  `PersonalID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `psicologia`
--

INSERT INTO `psicologia` (`Numero`, `UserID`, `Motivo`, `Objetivos`, `Recomendaciones`, `Fecha`, `PersonalID`) VALUES
(3, 'CEDIF-01U232', 'ESTRÉS', 'REDUCIR SÍNTOMAS DE ESTRÉS', 'TOMAR 20MIN DE DESCANSO ENTRE CADA ACTIVIDAD', '27/8/2023', ''),
(4, 'CEDIF-01U233', 'PROBLEMAS DE SUEÑO', 'MEJORAR EL ESTADO DE ÁNIMO', 'DORMIR TEMPRANO Y HACER EJERCICIO', '27/8/2023', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salud_consultas`
--

CREATE TABLE `salud_consultas` (
  `UserID` varchar(100) NOT NULL,
  `PersonalID` varchar(100) NOT NULL,
  `FrecuenciaCardiaca` int(15) NOT NULL,
  `FrecuenciaRespiratoria` int(15) NOT NULL,
  `Glucosa` int(15) NOT NULL,
  `SatOxigeno` int(15) NOT NULL,
  `PresionArterial` varchar(15) NOT NULL,
  `Medicacion` text NOT NULL,
  `Fecha` varchar(50) NOT NULL,
  `NumeroConsulta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salud_consultas`
--

INSERT INTO `salud_consultas` (`UserID`, `PersonalID`, `FrecuenciaCardiaca`, `FrecuenciaRespiratoria`, `Glucosa`, `SatOxigeno`, `PresionArterial`, `Medicacion`, `Fecha`, `NumeroConsulta`) VALUES
('CEDIF-01U233', '', 65, 80, 110, 80, '120', 'PARACETAMOL', '27/8/2023', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salud_expedientes`
--

CREATE TABLE `salud_expedientes` (
  `UserID` varchar(10) NOT NULL,
  `PersonalID` varchar(10) NOT NULL,
  `Alergias` varchar(50) NOT NULL,
  `Padecimientos` text NOT NULL,
  `NumeroExpediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salud_expedientes`
--

INSERT INTO `salud_expedientes` (`UserID`, `PersonalID`, `Alergias`, `Padecimientos`, `NumeroExpediente`) VALUES
('CEDIF-01U2', '', 'NINGUNA', 'Diabetes', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superusuarios`
--

CREATE TABLE `superusuarios` (
  `SU_ID` int(11) NOT NULL,
  `Username` varchar(40) NOT NULL,
  `Contraseña` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `superusuarios`
--

INSERT INTO `superusuarios` (`SU_ID`, `Username`, `Contraseña`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talleres`
--

CREATE TABLE `talleres` (
  `TallerID` varchar(100) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `CentroID` varchar(20) NOT NULL,
  `Instructor` varchar(100) NOT NULL,
  `Duracion` int(5) NOT NULL,
  `Dias` varchar(200) NOT NULL,
  `Hora` varchar(100) NOT NULL,
  `NumeroTaller` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talleres`
--

INSERT INTO `talleres` (`TallerID`, `Nombre`, `CentroID`, `Instructor`, `Duracion`, `Dias`, `Hora`, `NumeroTaller`) VALUES
('CEDIF-01T1', 'CANTO', 'CEDIF-01', 'JUANA TORRES RAMIREZ', 60, 'Lunes,Miércoles,Viernes', '10:00', 11),
('CEDIF-03T12', 'PINTURA', 'CEDIF-03', 'LIC. PABLO ORTIZ', 120, 'Martes,Sábado', '16:05', 12),
('CEDIF-01T13', 'REALIDAD INMERSIVA', 'CEDIF-01', 'LIC. JULIA HERNANDEZ', 60, 'Lunes,Viernes,Miércoles', '18:00', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UserID` varchar(50) NOT NULL,
  `CentroID` varchar(50) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `ApellidoPaterno` varchar(100) NOT NULL,
  `ApellidoMaterno` varchar(100) NOT NULL,
  `Edad` varchar(10) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Sexo` varchar(50) NOT NULL,
  `Fecha` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UserID`, `CentroID`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `Edad`, `Telefono`, `Sexo`, `Fecha`) VALUES
('CEDIF-01U232', 'CEDIF-01', 'ANDREA ', 'MORENO ', 'SANDOVAL', '34', '4778562980', 'Femenino', '27/8/2023'),
('CEDIF-01U233', 'CEDIF-01', 'LUIS', 'PEREZ', 'TORRES', '34', '4773509584', 'Masculino', '27/8/2023'),
('CEDIF-01U234', 'CEDIF-01', 'ANGEL', 'CARRANCO', 'TORRES', '54', '4778270363', 'Masculino', '27/8/2023');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`TallerID`);

--
-- Indices de la tabla `centros`
--
ALTER TABLE `centros`
  ADD PRIMARY KEY (`ID_Centro`);

--
-- Indices de la tabla `contactoemergencia`
--
ALTER TABLE `contactoemergencia`
  ADD PRIMARY KEY (`UserID`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`UserID`);

--
-- Indices de la tabla `fotouser`
--
ALTER TABLE `fotouser`
  ADD PRIMARY KEY (`UserID`);

--
-- Indices de la tabla `numerousuarios`
--
ALTER TABLE `numerousuarios`
  ADD PRIMARY KEY (`Indice`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`PersonalID`);

--
-- Indices de la tabla `psicologia`
--
ALTER TABLE `psicologia`
  ADD PRIMARY KEY (`Numero`);

--
-- Indices de la tabla `salud_consultas`
--
ALTER TABLE `salud_consultas`
  ADD PRIMARY KEY (`NumeroConsulta`);

--
-- Indices de la tabla `salud_expedientes`
--
ALTER TABLE `salud_expedientes`
  ADD PRIMARY KEY (`NumeroExpediente`);

--
-- Indices de la tabla `superusuarios`
--
ALTER TABLE `superusuarios`
  ADD PRIMARY KEY (`SU_ID`);

--
-- Indices de la tabla `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`NumeroTaller`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `numerousuarios`
--
ALTER TABLE `numerousuarios`
  MODIFY `Indice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `psicologia`
--
ALTER TABLE `psicologia`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `salud_consultas`
--
ALTER TABLE `salud_consultas`
  MODIFY `NumeroConsulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `salud_expedientes`
--
ALTER TABLE `salud_expedientes`
  MODIFY `NumeroExpediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `superusuarios`
--
ALTER TABLE `superusuarios`
  MODIFY `SU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `talleres`
--
ALTER TABLE `talleres`
  MODIFY `NumeroTaller` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
