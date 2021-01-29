import React, { Component } from 'react'
import Chart from "react-google-charts";

export default class chartsBar extends Component {
    render() {
        return (
            <div>
                <div style={{ display: 'flex', marginTop: '2rem' }}>
                <Chart
                  width={800}
                  height={600}
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={this.props.dataNeo}
                  options={{
                    title: 'NEO',
                    chartArea: { width: '50%', height: '90%' },
                  }}
                />
              </div>
            </div>
        )
    }
}
