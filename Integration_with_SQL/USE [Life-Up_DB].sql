USE [Life-Up-DB]
/*----------------------------------------TABLA DE SUPER USUARIOS----------------------------------------*/
   CREATE TABLE SuperUsuarios
   (
      SU_ID int IDENTITY(1,1) PRIMARY KEY,
      Username varchar(255),
      Contraseña varchar(255)
   )
/*----------------------------------------TABLA DE CENTROS GERONTOLÓGICOS----------------------------------------*/
   CREATE TABLE Centros
   (
      ID_Centro varchar(255) PRIMARY KEY,
      Nombre varchar(255),
      Direccion varchar(255),
      Delegacion varchar(255),
      CodigoPostal int,
   )
/*----------------------------------------TABLA DE PERSONAL----------------------------------------*/
   CREATE TABLE Personal
   (
      Personal_ID varchar(255) PRIMARY KEY,
      Rol varchar(255),
      ID_Centro varchar(255),
      Email varchar(255),
      Contraseña varchar(255),
      Ref_SU varchar(255)
   )
/*----------------------------------------TABLA DE USUARIOS----------------------------------------*/
   CREATE TABLE Usuarios
   (
      User_ID varchar(255) PRIMARY KEY,
      ID_Centro varchar(255),
      Nombre varchar(255),
      ApellidoPaterno varchar(255),
      ApellidoMaterno varchar(255),
      Edad int, 
      Telefono int   
   )
/*----------------------------------------TABLA DE DIRECCIONES DE LOS USUARIOS----------------------------------------*/
   CREATE TABLE Direcciones
   (
      User_ID varchar(255) PRIMARY KEY,
      Calle varchar(255),
      Colonia varchar(255),
      CodigoPostal varchar(6),
      Delegacion varchar(255)
   )
/*----------------------------------------TABLA DE CONTACTOS DE EMERGENCIA----------------------------------------*/
   CREATE TABLE ContactoEmergencia
   (
      User_ID varchar(255) PRIMARY KEY,
      Nombre varchar(255),
      ApellidoPaterno varchar(255),
      ApellidoMaterno varchar(255),
      Edad int, 
      Telefono int,
      Parentesco varchar(255)
   )
/*----------------------------------------TABLA DE FOTOS----------------------------------------*/
   CREATE TABLE FotoUser
   (
      User_ID varchar(255) PRIMARY KEY,
      FotoURL varchar(255)
   )
/*----------------------------------------TABLA DE SALUD EXPEDIENTES----------------------------------------*/
   CREATE TABLE SaludExpedientes
   (
      User_ID varchar(255) PRIMARY KEY,
      Personal_ID varchar(255),
      ID_Centro varchar(255),
      Alergias varchar(255),
      Padecimientos varchar(255),
      Ultima_Consulta varchar(8),
      NumeroExpediente int IDENTITY(1,1)
   )
/*----------------------------------------TABLA DE SALUD CONSULTAS----------------------------------------*/
   CREATE TABLE SaludConsultas
   (
      User_ID varchar(255) PRIMARY KEY,
      Personal_ID varchar(255),
      ID_Centro varchar(255),
      FrecuenciaCardiaca int,
      FrecuenciaRespiratoria int,
      Glucosa int,
      Sat int,
      PresionArterial varchar(7),
      Medicacion varchar(255),
      Fecha varchar(8),
      NumeroConsulta int IDENTITY(1,1)
   )
/*----------------------------------------TABLA DE PSICOLOGÍA----------------------------------------*/
   CREATE TABLE Psicologia
   (
      User_ID varchar(255) PRIMARY KEY,
      Motivo varchar(255),
      Objetivos varchar(255),
      Recomendaciones varchar(255),
      Fecha varchar(8),
      Personal_ID varchar(255),
      NumeroConsulta int IDENTITY(1,1)
   )
/*----------------------------------------TABLA DE TALLERES----------------------------------------*/
   CREATE TABLE Taller
   (
      Taller_ID varchar(255) PRIMARY KEY,
      Nombre varchar(255),
      ID_Centro varchar(255),
      Instructor varchar(255),
      Duracion int,
      Dias varchar(255),
      Numero_taller int IDENTITY(1,1)
   )
/*----------------------------------------TABLA DE ASISTENCIA----------------------------------------*/
   CREATE TABLE Asistencia
   (
      Taller_ID varchar(255) PRIMARY KEY,
      User_ID varchar(255),
      Fecha varchar(8)
   )

/*----------------------------------------INSERTS DE INICIO----------------------------------------*/
INSERT INTO SuperUsuarios(Username,Contraseña) VALUES ('admin', 'admin')
INSERT INTO Centros VALUES ('LU-01', 'Centro 1', 'Madroño del valle 135, valle de león', 'Cerro gordo', 37140)