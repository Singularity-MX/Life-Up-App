import React from 'react';
import { Chart } from 'react-google-charts';

const generateRandomData = () => {
  const data = [['Edad', 'Inscripciones']];
  for (let edad = 56; edad <= 95; edad++) {
    const inscripciones = Math.floor(Math.random() * 5) + 1; // 1-5 inscripciones por edad
    data.push([edad, inscripciones]);
  }
  return data;
};

const options = {
  title: 'Edades en Centros Gerontológicos',
  hAxis: { title: 'Edad' },
  vAxis: { title: 'Inscripciones' },
  legend: 'none',
  pointSize: 8,
};

function ScatterChart() {
  return (
    <div className="chart-container">
      <Chart
        chartType="ScatterChart"
        width="100%"
        height="400px"
        data={generateRandomData()}
        options={options}
      />
    </div>
  );
}

export default ScatterChart;
