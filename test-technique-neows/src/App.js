import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'

import ChartsBars from './component/chartsBar'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataNeoAll: [
      ],
      dataNeoJupitr: [],
      dataNeoVenus: [],
      filter: 'all'
    }
  }

  fetchDataAll = () => {
    fetch("data.json")
      .then((response) => { return response.json(); })
      .then((result) => {
        var data = []
        var newData;

        for (let i = 0; i < result.near_earth_objects.length; i++) {
          data.push([result.near_earth_objects[i].name, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_min, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_max])
        }

        newData = data.sort((b, a) => {
          return a[1] - b[2];
        });

        newData.unshift(['name', 'Min estimated diameter (km)', 'Max estimated diameter'],)
        this.setState({ dataNeoAll: newData})
      }

      )
  }

  fetchDataJupitr = () => {
    fetch("data.json")
      .then((response) => { return response.json(); })
      .then((result) => {
        var dataJupitr = []
        var newDataJupitr;
        for (let i = 0; i < result.near_earth_objects.length; i++) {
          for (let j = 0; j < result.near_earth_objects[i].close_approach_data.length; j++) {
            if (result.near_earth_objects[i].close_approach_data[j].orbiting_body == 'Juptr') {
              dataJupitr.push([result.near_earth_objects[i].name, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_min, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_max]
              )
              i++
            }
          }
        }
        newDataJupitr = dataJupitr.sort((b, a) => {
          return a[1] - b[2];
        });

        dataJupitr.unshift(['name', 'Min estimated diameter (km)', 'Max estimated diameter'],)
        this.setState({ dataNeoJupitr: newDataJupitr})
      }

      )
  }

  fetchDataVenus= () => {
    fetch("data.json")
      .then((response) => { return response.json(); })
      .then((result) => {
        var dataVenus = []
        var newDataVenus;
        console.log(result.near_earth_objects)
        for (let i = 0; i < result.near_earth_objects.length; i++) {
          for (let j = 0; j < result.near_earth_objects[i].close_approach_data.length; j++) {
            if (result.near_earth_objects[i].close_approach_data[j].orbiting_body == 'Venus') {
              dataVenus.push([result.near_earth_objects[i].name, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_min, result.near_earth_objects[i].estimated_diameter.kilometers.estimated_diameter_max]
              )
              i++
            }
          }
        }
        newDataVenus = dataVenus.sort((b, a) => {
          return a[1] - b[2];
        });

        dataVenus.unshift(['name', 'Min estimated diameter (km)', 'Max estimated diameter'],)
        this.setState({ dataNeoVenus: newDataVenus})
      }

      )
  }

  handleSubmit(event) {
    alert('Un essai a été envoyé : ' + this.state.filter);
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  }

  componentDidMount = () => {
    this.fetchDataVenus()
    this.fetchDataJupitr()
    this.fetchDataAll()
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
        <form onSubmit={this.handleSubmit}>
          <label>
            Choisissez votre parfum favori :
          <select value={this.state.filter} onChange={this.handleChange}>
              <option value='all'>All</option>
              <option value='jupiter'>Jupiter</option>
              <option value='venus'>Venus</option>
            </select>
          </label>
          <input type="submit" value="Envoyer" />
        </form>
        {(() => {
          if (this.state.filter == 'all') {
            return (
              <ChartsBars dataNeo={this.state.dataNeoAll}/>
            );
          } else if (this.state.filter == 'jupiter') {
            return (
              <ChartsBars dataNeo={this.state.dataNeoJupitr}/>
            );
          }
          else if (this.state.filter == 'venus') {
            return (
              <ChartsBars dataNeo={this.state.dataNeoVenus}/>
            );
          }
        })()}

    
                 <table className='table' border='0' cellPadding='10' size='50%'> 
                    <thead>
                        <tr >
                        <th></th>
                            <th>nom NEO</th>
                            <th>min diameter</th>
                            <th>max diameter</th>
                        </tr>
                    </thead>
                  
                </table>

      </div>
    )
  }
}