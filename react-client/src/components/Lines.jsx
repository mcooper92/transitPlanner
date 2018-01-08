import React from 'react';
import $ from 'jquery';
import sampleData from '../sample_data.js';


class Lines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      service_lines: [],
      selected: '',
      stops:[],
      currentLine: '',
      stops: [],
      favorites: [],
      favoritesinDB: []
    }
  }


 
  componentDidMount(){
    $.ajax({
     method: 'GET',
     url: '/api/lines',
     success: (data) => {
      //console.log('Successful GET request', data);
      this.setState({service_lines: data});
      this.getfavoritedFromDb();
      //console.log("SERVICE LINES", this.state.service_lines)
      }
    })
  }


  searchOneLine(line_id){
     $.ajax({
     method: 'GET',
     url: '/api/lines/:lineId',
     data:{lineId: this.state.currentLine},
     success: (data) => {
      console.log('Successful GET request from SEARCHONELINE', data);
      this.setState({stops: data});
      
      }
    })

  }

  changeSelect(event) {
  this.setState({selected: event.target.value}, () => {this.handleSelect(this.state.selected)});
  }

  handleSelect(){

    if (this.state.selected === 'Red: towards Richmond') {
      this.setState({currentLine: '1'}, () => {this.searchOneLine(this.state.currentLine)});
    } else if (this.state.selected === 'Red: towards Millbrae') {
      this.setState({currentLine: '2'}, () => {this.searchOneLine(this.state.currentLine)});
    } else if (this.state.selected === 'Yellow: towards Pittsburg/Bay Point') {
      this.setState({currentLine: '3'}, () => {this.searchOneLine(this.state.currentLine)});
      } else if (this.state.selected === 'Yellow: towards Millbrae') {
      this.setState({currentLine: '4'}, () => {this.searchOneLine(this.state.currentLine)});
    } else if (this.state.selected === 'Blue: towards Daly City') {
      this.setState({currentLine: '5'}, () => {this.searchOneLine(this.state.currentLine)});
      } else if (this.state.selected === 'Blue: towards Dublin/Pleasanton') {
      this.setState({currentLine: '6'}, () => {this.searchOneLine(this.state.currentLine)});
    } else if (this.state.selected === 'Green: towards Warm Springs') {
      this.setState({currentLine: '7'}, () => {this.searchOneLine(this.state.currentLine)});
      } else if (this.state.selected === 'Green: towards Daly City') {
      this.setState({currentLine: '8'}, () => {this.searchOneLine(this.state.currentLine)});
    } else if (this.state.selected === 'Orange: towards Richmond') {
      this.setState({currentLine: '9'}, () => {this.searchOneLine(this.state.currentLine)});
    } else if (this.state.selected === 'Orange: towards Warm Springs') {
      this.setState({currentLine: '10'}, () => {this.searchOneLine(this.state.currentLine)});
    }
  }
  

isfavorited(stationName){
  $.ajax({
    method: 'POST',
    url: '/favoriteStations',
    data:{stationName: stationName},
    success: (data) => {
      //alert("Favorited!")
    }
  })
}

getfavoritedFromDb(){
  $.ajax({
    method: 'GET',
    url:'/favoriteStations',
    success: (data) => {
      //console.log("FROM DB", data)
      this.setState({favorites: data})
    }

  })
}


handleClick(event) {
  var favorites = this.state.favorites.slice();
  favorites.push(event.target.innerHTML);
  this.getfavoritedFromDb();
  this.isfavorited(event.target.innerHTML);
  
}



  render() {
  return (
    <div className="lines-view">
      <div className="selections">
        Choose a line:
        <select value={this.state.selected} onChange={this.changeSelect.bind(this)}>
        {this.state.service_lines.map((line, index) =>{
          return <option key={index}>{line.name}</option>
        })}
         
        </select>
      </div>
      <div className="lines-stop-list">

        <ul>
          {this.state.stops.map((stop, index) => {
            return <li key={index} onClick={this.handleClick.bind(this)}>{stations[stop.station_id]}</li>
          })}
         
        </ul>
      </div>
      
       <div>Choose a line from the drop down menu above and then click a station name to add it your favorites. You can unfavorite a station by clicking its name again. </div> <br/>
       Favorites: 
      <ul> {this.state.favorites.map((favorite, index) => {
        return <li key={index}>{favorite.name}</li>
      })}
      </ul>


    </div>
  );
  }
}



var stations = [
"12th St/Oakland City Center",
"16th St/Mission",
"19th St/Oakland",
"24th St/Mission",
"Ashby",
"Balboa Park",
"Bay Fair",
"Castro Valley",
"Civic Center",
"Coliseum",
"Colma",
"Concord",
"Daly City",
"Downtown Berkeley",
"Dublin/Pleasanton",
"El Cerrito del Norte",
"El Cerrito Plaza",
"Embarcadero",
"Fremont",
"Fruitvale",
"Glen Park",
"Hayward",
"Lafayette",
"Lake Merritt",
"MacArthur",
"Millbrae",
"Montgomery St.",
"North Berkeley",
"North Concord/Martinez",
"Orinda",
"Pittsburg/Bay Point",
"Pleasant Hill/Contra Costa Centre",
"Powell St.",
"Richmond",
"Rockridge",
"San Bruno",
"San Francisco International Airport",
"San Leandro",
"South Hayward",
"South San Francisco",
"Union City",
"Walnut Creek",
"Warm Springs/South Fremont",
"West Dublin/Pleasanton"
]

module.exports = Lines;


// onClick={this.handleClick.bind(this)}








