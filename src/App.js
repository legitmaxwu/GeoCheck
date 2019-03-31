import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { PantryMap } from './components/PantryMap'
import { css } from 'emotion'

import STATIC_MARKER_DATA from './data/pantries'
import DISASTER_DATA from './data/disaster'

var MARKER_DATA = [];
var static_disaster_data = [];
var disaster_data = [];
var useStaticData = true;
var api_data = [];

class App extends Component {
  constructor(props)
  {
    super(props);
    this._callAPI = this._callAPI.bind(this);
  }
  _callAPI() {
    console.log("call");
    fetch(`https://39cbcebf.ngrok.io/coords/`)
    .then(res => {
      return res.clone().json();
    })
    .then(
      res => {
        console.log(res);
        api_data = res;
        var counter = 0;
        disaster_data = [];
        for (var cluster in api_data)
        {
          for (var j = 0; j < api_data[cluster].length; j++)
          {
            for (var marker in api_data[cluster][j])
            {
              api_data[cluster][j][marker].display = true;
              api_data[cluster][j][marker].displayCard = false;
              api_data[cluster][j][marker].cluster = counter;
            }
            disaster_data.push(api_data[cluster][j]);
          }
          counter++;
        }
      }
    ).then(this.setState({markers: disaster_data}))
  }
  componentDidMount() {
    // console.log(CRIME_DATA);
    // for (var i = 0; i < CRIME_DATA.length; i++)
    // {
    //   CRIME_DATA[i].display = true;
    //   const radius = 0.005;
    //   const x = parseFloat(CRIME_DATA[i][24][1] - 34.045);
    //   const y = parseFloat(CRIME_DATA[i][24][2] - (-118.2537));
    //   if (x * x + y * y < radius * radius)
    //   {
    //     CRIME_DATA[i].status = 2;
    //   }
    //   else if (CRIME_DATA[i][24][1] > 34.045)
    //   {
    //     CRIME_DATA[i].status = 1;
    //   }
    //   else
    //   {
    //     CRIME_DATA[i].status = 0;
    //   }
    // }
    // this.forceUpdate();

    // if (useStaticData)
    // {
    //   for (var i = 0; i < DISASTER_DATA.length; i++)
    //   {}
    // }
    
    if (useStaticData) {
      var counter = 0;
      for (var cluster in DISASTER_DATA)
      {
        for (var j = 0; j < DISASTER_DATA[cluster].length; j++)
        {
          for (var marker in DISASTER_DATA[cluster][j])
          {
            DISASTER_DATA[cluster][j][marker].display = true;
            DISASTER_DATA[cluster][j][marker].cluster = counter;
          }
          static_disaster_data.push(DISASTER_DATA[cluster][j]);
        }
        counter++;
      }
      this.forceUpdate();
    }
    else {
      window.setInterval(this._callAPI, 5000);
    }

    // console.log("ligma");
    // console.log(static_disaster_data);
    // // console.log(disaster_data);

    // if (useStaticData) {
    //   for (var i = 0; i < STATIC_MARKER_DATA.length; i++)
    //   {
    //     const radius = 0.005;
    //     const x = parseFloat(STATIC_MARKER_DATA[i].latitude - 34.045);
    //     const y = parseFloat(STATIC_MARKER_DATA[i].longitude - (-118.2537));
    //     if (x * x + y * y < radius * radius)
    //     {
    //       STATIC_MARKER_DATA[i].status = 2;
    //     }
    //     else if (STATIC_MARKER_DATA[i].latitude > 34.045)
    //     {
    //       STATIC_MARKER_DATA[i].status = 1;
    //     }
    //     else
    //     {
    //       STATIC_MARKER_DATA[i].status = 0;
    //     }
    //     STATIC_MARKER_DATA[i].display = true;
    //   }
    //   this.forceUpdate();
    // }
    // else {
    //   fetch(`http://localhost:5000/api/pantries`)
    //   .then(res => res.json())
    //   .then(
    //     res => {
    //       MARKER_DATA = res;
    //       for (var i = 0; i < MARKER_DATA.length; i++)
    //       {
    //         MARKER_DATA[i].display = true;
    //       }
    //       this.forceUpdate();
    //     }
    //   );
    // }   
  }

  render() {
    return (
      <div className="App">
        <div className={css`width: 100%; height: 100%;`}>
          <PantryMap 
            //markers={ useStaticData ? STATIC_MARKER_DATA : MARKER_DATA }
            markers={ useStaticData ? static_disaster_data : disaster_data }
          />
        </div>
      </div>
    );
  }
}

export default App;
