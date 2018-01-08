import React from 'react';
import $ from 'jquery';
import sampleData from '../sample_data.js'

  class TripPlanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      favoriteStations: [],
      start: '',
      end: ''
    }
  }
 

 componentDidMount(){
    $.ajax({
     method: 'GET',
     url: '/stationsInTripPlanner',
     success: (data) => {
      this.setState({stations: data}, () => {this.getFavorites()});
      }
    })
  }

  getFavorites(){
    $.ajax({
     method: 'GET',
     url: '/favoriteStations',
     success: (data) => {
      this.setState({favoriteStations: data}); 
      }
    })
  }
  

  changeStart(event) {
  this.setState({start: event.target.value});
  }

  changeEnd(event) {
    this.setState({end: event.target.value});
  }

 render() {
  return (
    <div className="trip-planner-view">
      Your Favorite Stations:
      <ul> {this.state.favoriteStations.map((favorite, index) => {
        return <li key={index}>{favorite.name}</li>
      })}
      </ul>
      <div className="selections">
        Start: 
        <select onChange={this.changeStart.bind(this)}>
        {this.state.stations.map((station, index) =>{
          return <option key={index}>{station.name}</option>
        })}
        </select>

        <br />

        End: 
        <select onChange={this.changeEnd.bind(this)}>
          {this.state.stations.map((station, index) =>{
          return <option key={index}>{station.name}</option>
        })}
        </select>

        <br />

        <button>Go!</button>
      </div>

      <div className="directions">
        <div className="directions-summary">
          <p className="line-name">Station {this.state.start} to Station {this.state.end}</p>
          <p>31 minutes (arrive at 5:51pm)</p>
        </div>

        <div className="directions-step">
          <div className="directions-line-header">
            <p className="line-name">Start at {this.state.start}</p>
          </div>
        </div>

        <div className="directions-step">
          <div className="directions-line-header">
            <div className="line-circle" style={{backgroundColor: "#ed1d24"}}></div>
            <p className="line-name">{sampleData.sampleDirections[1].mainText}</p>
            <p className="line-direction">towards Station C</p>
          </div>
          <ul>
          {sampleData.sampleDirections[1].stops.map((stop, index) => {
            return <li key={index}>{stop}</li>
          })}
        </ul>
        </div>

        <div className="directions-step">
          <div className="directions-line-header">
            <p className="line-name">{sampleData.sampleDirections[2].mainText}</p>
          </div>
        </div>

        <div className="directions-step">
          <div className="directions-line-header">
            <div className="line-circle" style={{backgroundColor: "#0099cc"}}></div>
            <p className="line-name">{sampleData.sampleDirections[3].mainText}</p>
            <p className="line-direction">towards Station F</p>
          </div>
          <ul>
          {sampleData.sampleDirections[3].stops.map((stop, index) => {
            return <li key={index}>{stop}</li>
          })}
         
        </ul>
        </div>

        <div className="directions-step">
          <div className="directions-line-header">
            <p className="line-name">Arrive at {this.state.end}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default TripPlanner;