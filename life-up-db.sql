-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2023 a las 06:36:21
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
('CEDIF-01', 'Centro N1', 'Oxigeno #23, Valle de Señora.', 'Delegacion 01', 37140),
('CEDIF-02', 'Centro ABC1', 'Cloro #283, Valle de Señora.', 'Delegacion 02', 37160);

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
('', 'EGRSZ', 'DFGS', 'DFS', 67, 'Nieto'),
('CEDIF-01U2310', 'ADS', 'ADSDFG', 'FGD', 34, 'Hermano');

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
('', 'DSFVGD', 'GFDH', 6756, 'FHG', 'DSFG', 'DFGD'),
('CEDIF-01U2310', 'ADSS', 'SAD', 3234, 'ASD', 'ASD', 'SA');

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
('', '1691342504219_th.jpg'),
('CEDIF-01U2310', '1691342064594_photo_2021-11-07_11-44-41_darwin.jpg');

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
(2, 'CEDIF-01P232'),
(3, 'CEDIF-01P233'),
(4, 'CEDIF-01P234'),
(5, 'CEDIF-01P235'),
(6, 'CEDIF-01P236'),
(7, 'CEDIF-01U237'),
(8, 'CEDIF-01U238'),
(9, 'CEDIF-01U239'),
(10, 'CEDIF-01U2310'),
(11, '');

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

INSERT INTO `psicologia` (`UserID`, `Motivo`, `Objetivos`, `Recomendaciones`, `Fecha`, `PersonalID`) VALUES
('CEDIF-01U238', 'AAAA', 'BBBB', 'SADDSDADWFE', '30/7/2023', 'CEDIF-01P235'),
('CEDIF-01U238', 'SAD', 'SFDG', 'DFG', '30/7/2023', 'CEDIF-01P235');

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
('CEDIF-01U238', 'CEDIF-01P235', 4, 4, 4, 5, '4', 'FD', '30/7/2023', 1),
('CEDIF-01U238', 'CEDIF-01P235', 4, 4, 4, 5, '4', 'FD', '30/7/2023', 2),
('CEDIF-01U238', 'CEDIF-01P235', 32, 32, 2, 234, '3', 'ASD', '30/7/2023', 3);

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
('CEDIF-01U2', 'CEDIF-01P2', 'SAD', 'Diabetes', 10);

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
('', '', 'SVFADFSDGG', 'FDGD', 'FDFFG', '5', '667', 'Femenino', '6/8/2023'),
('CEDIF-01U2310', 'CEDIF-01', 'JOSE JAVIER', 'GUTIERREZ ', 'RAMIREZ', '23', '477228', 'Masculino', '6/8/2023');

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
-- AUTO_INCREMENT de la tabla `salud_consultas`
--
ALTER TABLE `salud_consultas`
  MODIFY `NumeroConsulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `salud_expedientes`
--
ALTER TABLE `salud_expedientes`
  MODIFY `NumeroExpediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `superusuarios`
--
ALTER TABLE `superusuarios`
  MODIFY `SU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `talleres`
--
ALTER TABLE `talleres`
  MODIFY `NumeroTaller` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
