import logo from './logo.svg';
import './App.css';
import Chart from "react-google-charts";
import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataNeo: [ 
        ]
    }
  }



  fetchData = () => {
    fetch("data.json")
      .then((response) => { return response.json(); })
      .then((result) => {
        var data = []
        var newData = this.state.dataNeo
        console.log(result.near_earth_objects)
        for (let i = 0; i < result.near_earth_objects.length; i++) {
          data.push([result.near_earth_objects[i].name, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_min, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_max])
         }
         
         newData = data.sort((b, a) => {
            return a[1] - b[2];
          });
        
          newData.unshift(['name', 'Min estimated diameter (km)', 'Max estimated diameter'],)
        console.log(newData)
        console.log(data)
         this.setState({dataNeo: newData})
     }
        
      )
  }

  componentDidMount = () => {

    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello WOrld
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        <div style={{ display: 'flex' , marginTop: '2rem'}}>
          <Chart
            width={800}
            height={600}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={this.state.dataNeo}
            options={{
              title: 'NEO',
              chartArea: { width: '50%', height: '90%'},
            }}
            
          />
        </div>
      </div>
    )
  }
}