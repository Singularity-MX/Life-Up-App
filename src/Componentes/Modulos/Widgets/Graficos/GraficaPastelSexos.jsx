import React from 'react';
import { Chart } from 'react-google-charts';
import '../styles/GraficaPastel.css'

const GenderChart = (props) => {
  
  const { 
    color1,
    color2,
    hole,
    titulo,
    datos,
    Graphic3D,
} = props;
  
  
  
  // Datos de ejemplo para la gráfica de pastel



  // Opciones de la gráfica
  const options = {
    backgroundColor: '#f0f0f0',
    title: '',
    pieHole: hole, // Agrega un agujero al centro para hacer un donut chart (opcional)
    colors: [color1, color2],
    pieSliceTextStyle: {
      color: '#444', 
      fontSize: 14, // Ajustar el tamaño de la fuente para las etiquetas
      
     
    },
    is3D:Graphic3D,
  };

  return (
   
      <div id='contenedorWidget'>
        <div id='contenedorTitulo'>
          <h4 id='titleGrafica'>{titulo}</h4>
        </div>
        <div id='graficaCont'>
        <Chart
          chartType="PieChart"
    
          data={datos}
          options={options}
        /></div>
      </div>
    
  );
};

export default GenderChart;
