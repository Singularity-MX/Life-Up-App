import React, { Component } from 'react'
import Chart from 'react-google-charts'
const scatterData = [
  ['Age', 'Weight'],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7],
]
const scatterOptions = {
  title: 'Age vs. Weight comparison',
  hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
  vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
  legend: 'none',
}
class ScatterChart extends Component {
  render() {
    return (
      <div>
        <h2>React Scatter Chart Example</h2>
        <Chart
          width={'700px'}
          height={'420px'}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={scatterData}
          options={scatterOptions}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
}
export default ScatterChart