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
  stroke: 'none'
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
    const {size = 20, onClick} = this.props;
    var fillColor;
    var marker = this.props.marker;
    console.log(this.props.displayMode);
    switch(this.props.displayMode)
    {
      case "injured":
        fillColor = '#9fff45';
        break;
      case "safety":
        fillColor = marker.safety ? '#3e8934' : '#893434';
        break;
      case "fire":
        fillColor = '#893434';
        break;
      case "collapsed":
        fillColor = '#893434';
        break;
      case "resources":
        fillColor = '#893434';
        break;
      case "priority":
        if (marker.priority === 1)
          fillColor = '#893434';
        else if (marker.priority === 2)
          fillColor = '#e5dd80';
        else
          fillColor = '#3e8934';
        break;
      default:
        fillColor="#000"
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
    if (marker.display === true) {
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
        coordinates={[ parseFloat(marker.longitude), parseFloat(marker.latitude)]}
        anchor="bottom">
          <Pin marker={marker} displayMode={this.props.displayMode.value}/>
        </Marker>
      );
    }
  }

  render() {
    const layers = [
      new LineLayer({id: 'line-layer', data})
    ];
    return (
      <Mapp
        style="mapbox://styles/mapbox/streets-v9"
        zoom={[15]}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        center={[-118.2537, 34.0422]}
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
        {this.props.markers && this.props.markers.map(this._renderMarker)}
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