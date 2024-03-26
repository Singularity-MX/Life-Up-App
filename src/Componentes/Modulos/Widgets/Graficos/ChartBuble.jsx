import React from 'react';
import { Chart } from 'react-google-charts';

const data = [
  ['Taller', 'Asistentes', 'Duración (horas)', 'Calificación'],
  ['Yoga', 50, 1, 4.5],
  ['Pintura', 30, 1.5, 4.2],
  ['Baile', 40, 1, 4.7],
  ['Música', 20, 1.5, 4.0],
  ['Juegos de mesa', 60, 1, 4.8],
];

function BubbleChart() {
  return (
    <div className="chart-container">
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="BubbleChart"
        loader={<div>Cargando gráfico...</div>}
        data={data}
        options={{
          title: 'Talleres más asistidos en centros gerontológicos',
          hAxis: { title: 'Asistentes' },
          vAxis: { title: 'Duración (horas)' },
          bubble: { textStyle: { fontSize: 11 } },
        }}
      />
    </div>
  );
}

export default BubbleChart;
