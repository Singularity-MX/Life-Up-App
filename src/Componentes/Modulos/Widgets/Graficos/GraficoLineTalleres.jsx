import React from 'react';
import { Chart } from 'react-google-charts';
import '../styles/styleChartLine.css';

const data = [
  ['Mes', 'Inscripciones'],
  ['Enero', 20],
  ['Febrero', 25],
  ['Marzo', 30],
  ['Abril', 32],
  ['Mayo', 49],
  ['Junio', 30],
  ['Julio', 53],
  ['Agosto', 48],
  ['Septiembre', 68],
  ['Octubre', 60],
  ['Noviembre', 78],
  ['Diciembre', 94],
];

const options = {
  title: 'Periodo Enero - Diciembre',
  curveType: 'function',
  legend: { position: 'bottom' },
};

function LineChartTalleres() {
  return (
    <div className="chart-container">
        <h4 id='titleGrafica'>Inscripción a Talleres en Centros Gerontológicos</h4>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default LineChartTalleres;
