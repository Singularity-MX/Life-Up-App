import React from 'react';
import { Chart } from 'react-google-charts';
import '../styles/GraficaPastel.css'

const LineChart = (props) => {
  const { 
    color,
    titulo,
    descripcion,
    titleX,
    titleY,
    datos,
    Graphic3D,
} = props;

  // Datos de ejemplo para el gráfico de líneas


  // Opciones del gráfico
  const options = {
    backgroundColor: '#f0f0f0',
    title: descripcion,
    hAxis: {
      title: titleX,
    },
    vAxis: {
      title: titleY,
    },
    legend: 'none', // Oculta la leyenda si no es necesaria
    colors: [color],
    
    
  };

  return (

    <div id='contenedorWidget'>
      <div id='contenedorTitulo'>
        <h4 id='titleGrafica'>{titulo}</h4>
      </div>
      <div id='graficaCont'>
      <Chart
        chartType="LineChart"
      
        data={datos}
        options={options}
      />
      </div>
    </div>
  );
};

export default LineChart;
