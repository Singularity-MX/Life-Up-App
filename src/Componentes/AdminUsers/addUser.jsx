import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import backendUrl from '../../serverConfig';
import axios from 'axios';

const Formulario = () => {
  const [personalId, setPersonalId] = useState('');
  const [rol, setRol] = useState('');
  const [centroId, setCentroId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceso, setAcceso] = useState('');
  const [superusuarioRef, setSuperusuarioRef] = useState('');

  const handleDownloadPDF = async () => {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Definir propiedades del documento
    const pageSize = page.getSize();
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;

    // Definir las posiciones de los campos en el PDF
    const x = 50;
    let y = pageHeight - 70;

    // Agregar los campos al PDF
    const defaultFontSize = 12;
    const fieldMargin = 10;

    const addFormField = (label, value) => {
      page.drawText(`${label}:`, {
        x,
        y,
        size: defaultFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText(value, {
        x: x + 100,
        y,
        size: defaultFontSize,
        color: rgb(0, 0, 0),
      });

      y -= defaultFontSize + fieldMargin;
    };

    addFormField('ID de Personal', personalId);
    addFormField('Rol', rol);
    addFormField('ID Centro', centroId);
    addFormField('Email', email);
    addFormField('Password', password);
    addFormField('Acceso', acceso);
    addFormField('Referencia', superusuarioRef);

    // Generar el PDF en formato bytes
    const pdfBytes = await pdfDoc.save();

    // Crear un objeto Blob y generar una URL para el archivo PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga y hacer clic automáticamente
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formulario.pdf';
    link.click();
  };

  const handleSubmit = () => {
    // Envía los datos al servidor
     // Crear un objeto con los datos del formulario
     const formData = {
        personalId,
        rol,
        centroId,
        email,
        password,
        acceso,
        superusuarioRef
      };
  
      // Enviar los datos al servidor utilizando Axios
      axios.post(backendUrl + '/api/', formData)
        .then(response => {
          // Manejar la respuesta del servidor si es necesario
          console.log(response.data);
        })
        .catch(error => {
          // Manejar errores si ocurre alguno
          console.error(error);
        });
  };


  const handleRolChange = (e) => {
    const selectedRol = e.target.value;
    setRol(selectedRol);

    // Verificar el rol seleccionado y ajustar el campo de acceso
    if (selectedRol === 'psicologo') {
      setAcceso('a');
    } else if (selectedRol === 'enfermero') {
      setAcceso('e');
    } else if (selectedRol === 'instructor') {
      setAcceso('i');
    } else if (selectedRol === 'administrador') {
      setAcceso('o');
    } else if (selectedRol === 'recepcionista') {
      setAcceso('u');
    } else {
      setAcceso('');
    }
  };

  return (
    <div>
      <h1>Formulario</h1>
      <label>ID de Personal:</label>
      <input type="text" value={personalId} onChange={e => setPersonalId(e.target.value)} />

      <label>Rol:</label>
      <select value={rol} onChange={handleRolChange}>
        <option value="">Seleccionar Rol</option>
        <option value="psicologo">Psicóloga</option>
        <option value="enfermero">Enfermero</option>
        <option value="instructor">Instructor</option>
        <option value="administrador">Administrador</option>
        <option value="recepcionista">Recepcionista</option>
      </select>

      <label>ID Centro:</label>
      <input type="text" value={centroId} onChange={e => setCentroId(e.target.value)} />

      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <label>Acceso:</label>
      <input type="text" value={acceso} readOnly />

      <label>Referencia SuperUsuario:</label>
      <input type="text" value={superusuarioRef} onChange={e => setSuperusuarioRef(e.target.value)} />

      <button onClick={handleDownloadPDF}>Descargar PDF</button>
      <button onClick={handleSubmit}>Enviar al servidor</button>
    </div>
  );
};

export default Formulario;

