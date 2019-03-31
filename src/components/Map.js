import React from 'react'
import ReactMapGL from 'react-map-gl'
// import { Marker, Popup, StaticMap } from 'react-map-gl'
import { css } from 'emotion'
import {MapboxLayer} from '@deck.gl/mapbox';
import {fromJS} from 'immutable'
import DeckGL, {LineLayer} from 'deck.gl';

import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl";

import DEFAULT_MAP_STYLE from '../data/map-style.json'

const MAP_STYLE = fromJS(DEFAULT_MAP_STYLE);

const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
  strokeWidth: 0
};

const paintLayer = {
  'fill-extrusion-color': '#aaa',
  'fill-extrusion-height': {
    type: 'identity',
    property: 'height'
  },
  'fill-extrusion-base': {
    type: 'identity',
    property: 'min_height'
  },
  'fill-extrusion-opacity': 1
};

// { value: 'injured', label: 'Number Injured' },
// { value: 'safety', label: 'Safety Level' },
// { value: 'fire', label: 'Fires' },
// { value: 'collapsed', label: 'Collapsed Buildings' },
// { value: 'resources', label: 'Need Food/Water' },
// { value: 'priority', label: 'Priority Level' },

class Pin extends React.Component {

  render() {

    var {size = 20, onClick} = this.props;
    var fillColor;
    var marker = this.props.marker;
    console.log("ligma");
    if (!!marker)
    {
      switch(this.props.displayMode)
      {
        case "injured":
          var a = marker.injured / 15.0 * 100;
          // fillColor = "hsl(" + a.toString() + ", 100%, 50%)";
          fillColor = 'hsl(356, ' + a.toString() + '%, 48.1%)';
          break;
        case "safety":
          fillColor = marker.status ? '#238823' : '#D2222D';
          break;
        case "fire":
          var rand = Math.random();
          if (rand > 0.66)
            fillColor = '#ffbf10';
          else if (rand > 0.33)
            fillColor = '#ee5519';
          else
            fillColor = '#c8200e';
          break;
        case "collapsed": // range: 0-3
          
          var a = marker.collapsed / 3.0 * 100;
          // fillColor = "hsl(" + a.toString() + ", 100%, 50%)";
          fillColor = 'hsl(347, ' + a.toString() + '%, 33.1%)';
          console.log(fillColor);
          break;
        case "resources":
          var b = marker.resourcesNeeded / 7.0 * 100;
          fillColor = 'hsl(184, ' + b.toString() + '%, 50.1%)'; // range: 0-7
          break;
        case "priority":
        case "cluster":
          if (marker.priority === 1)
            fillColor = '#D2222D'; // red
          else if (marker.priority === 2)
            fillColor = '#FFBF00'; // yellow
          else
            fillColor = '#238823'; // green
          break;
        default:
          fillColor="#D2222D";
          break;
      }
    }
    if (!marker)
    {
      size = 40;
      fillColor="#000000"
    }
    else if (marker.displayCard && marker.displayCard === true)
    {
      pinStyle.stroke = 'white'
      pinStyle.strokeWidth = 4;
    }
    else
    {
      pinStyle.stroke = 'none'
      pinStyle.strokeWidth = 0;
    }
    return (
      <svg 
        height={size}
        viewBox="0 0 24 24"
        style={{...pinStyle, fill: `${fillColor}`, transform: `translate(${-size / 2}px,${-size}px)`}}
        onClick={onClick}
      >
        <path d={ICON}/>
      </svg>
    );
  }
}

class Dot extends React.Component {
  render() {
    var fillColor = '';
    switch(parseInt(this.props.status))
    {
      case 2:
        fillColor = '#9fff45';
        break;
      default:
        fillColor = '#d00';
        break;
    }
    return (
      <div className={css`
        background-color: ${fillColor};
        height: 10px;
        width: 10px;
      `}>

      </div>
    );
  }
}

const centroids = [[  34.0690049,  -118.44265542],
[  34.07239212, -118.45148621],
[  34.07433306, -118.44027857],
[  34.07582755, -118.44122404]]

const initialViewState = {
  width: '100%',
  height: '100%',
  // latitude: 34.0422,
  // longitude: -118.2537,
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 14,
  pitch: 0,
  bearing: 0
};

const Mapp = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

export class Map extends React.Component {

  _renderMarker = (marker, index) => {
    console.log(marker);
    if (marker.display === true) { // HALPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
      return (
        // <Marker 
        //   key={`marker-${index}`}
        //   // latitude={parseFloat(marker[24][1])}
        //   // longitude={parseFloat(marker[24][2])}
        //   latitude={latitude={marker.latitude}}
        //   longitude={marker.longitude}
        // >
          
        //   {/* <Pin
        //     status={marker.status}
        //   /> */}
        //   <Dot status = {marker.status}/>
        // </Marker>
        <Marker
          coordinates={[ marker.coordinates.long, marker.coordinates.lat]}
          anchor="bottom"
        >
          {console.log("return shit")}
          <div>safsaofsafsafa</div>
          {console.log("sFOIFSF")}
          <Pin marker={marker} displayMode={this.props.displayMode.value}/>
        </Marker>
      );
    }
  }

  _onClick(marker, e) {
    console.log(e);
    console.log(marker);
    for (var i = 0; i < this.props.markers.length; i++)
    {
      for (var mark in this.props.markers[i])
      {
        this.props.markers[i][mark].displayCard = false;
      }
    }
    marker.displayCard = true;
    this.props.getMarkers(this.props.markers);
    console.log("click");
  }

  render() {
    const layers = [
      new LineLayer({id: 'line-layer', data})
    ];
    return (
      <Mapp
        style="mapbox://styles/mapbox/outdoors-v11"
        zoom={[15]}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        center={[-118.4452, 34.0729]}
      >
        <Layer
          id="3d-buildings"
          sourceId="composite"
          sourceLayer="building"
          filter={['==', 'extrude', 'true']}
          type="fill-extrusion"
          minZoom={14}
          paint={paintLayer}
        >
        </Layer>
        { this.props.markers.map(marker => 
          {
            for (var mark in marker)
            {
              if (marker[mark].display === true)
              {
                return (
                  <Marker
                    coordinates={[ marker[mark].coordinates.long, marker[mark].coordinates.lat]}
                    anchor="bottom"
                  >
                    <Pin
                      onClick={(e) => this._onClick(marker[mark], e)}
                      marker={marker[mark]} 
                      displayMode={this.props.displayMode.value}/>
                  </Marker>
                )
              }
              // this._renderMarker(marker[mark]);
            }
          }
        ) }
        { this.props.displayMode.value === 'cluster' && 
          centroids.map((centroid) => 
            <Marker
              coordinates={[ centroid[1], centroid[0]]}
              anchor="bottom"
            >
              <Pin
                marker={null} 
                displayMode={this.props.displayMode.value}/>
            </Marker>
          )
        }
      </Mapp>
      // <DeckGL
      //   initialViewState={initialViewState}
      //   controller={true}
      //   layers={layers}
      // >
      //   <StaticMap
      //     mapStyle={MAP_STYLE}
      //     mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_ACCESS_TOKEN }
      //   >
      //     {this.props.markers && this.props.markers.map(this._renderMarker)}
      //   </StaticMap>
      // </DeckGL>
    );
  }
}