import React from 'react'
import { Map } from './Map'
import { css } from 'emotion'
import { PantryCard } from './PantryCard';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Select from 'react-select';


import './styles.css'
import { set } from 'immutable';

// interface:
// markers
//    marker
//      name
//      address
//         ...
//      phone
//      hours open
//      zip code

const cardContainerStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
`

const options = [
  { value: 'injured', label: 'Number of People Injured' },
  { value: 'safety', label: 'Are People Safe?' },
  { value: 'fire', label: 'Location of Fires' },
  { value: 'collapsed', label: 'Infrastructure Damage' },
  { value: 'resources', label: 'Food and Water Needs' },
  { value: 'priority', label: 'Priority Level' },
  { value: 'cluster', label: "Recommended Response Locations"},
];

export class PantryMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.markers,
      fruits: [],
      selectedOption: {
        value: "default",
      }
    };
  }

  _getMarkers = (markers) => {
    this.setState({markers: markers});
  }

  _handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    for (var i = 0; i < this.props.markers.length; i++)
    {
      var mark = this.props.markers[i];
      for (var m in mark)
      {
        var marker = mark[m];
        marker.display = false;
        var option = selectedOption.value;
        if (option === "injured" && marker.injured && marker.injured > 0)
        {
          marker.display = true;
        }
        else if (option === "safety")
        {
          marker.display = true;
        }
        else if (option === "fire" && marker.fire && marker.fire === true)
        {
          marker.display = true;
        }
        else if (option === "collapsed" && marker.collapsed && marker.collapsed > 0)
        {
          marker.display = true;
        }
        else if (option === "resources" && marker.resourcesNeeded && marker.resourcesNeeded > 0)
        {
          marker.display = true;
        }
        else if (option === "priority" && marker.priority)
        {
          marker.display = true;
        }
        else if (option === "cluster")
        {
          marker.display = true;
        }
      }
    }
    this.setState({markers: this.props.markers});
  }

  componentDidUpdate() {
    for (var i = 0; i < this.props.markers.length; i++)
    {
      var mark = this.props.markers[i];
      for (var m in mark)
      {
        var marker = mark[m];
        marker.display = false;
        var option = this.state.selectedOption.value;
        if (option === "injured" && marker.injured && marker.injured > 0)
        {
          marker.display = true;
        }
        else if (option === "safety")
        {
          marker.display = true;
        }
        else if (option === "fire" && marker.fire && marker.fire === true)
        {
          marker.display = true;
        }
        else if (option === "collapsed" && marker.collapsed && marker.collapsed > 0)
        {
          marker.display = true;
        }
        else if (option === "resources" && marker.resourcesNeeded && marker.resourcesNeeded > 0)
        {
          marker.display = true;
        }
        else if (option === "priority" && marker.priority)
        {
          marker.display = true;
        }
        else if (option === "cluster")
        {
          marker.display = true;
        }
      }
    }
    if (this.state.markers !== this.props.markers)
    {
      this.setState({markers: this.props.markers});
    }
  }

  render() {
    return (
      <div className={css`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100vh;
      `}>

        <div className={ cardContainerStyles }>
          <div className={css`
            background-color: gray;
            padding: 15px;
          `}>
            <Select
              value={this.selectedOption}
              onChange={this._handleChange}
              options={options}
            />
          </div>
          <div className={css`
            overflow-y: scroll;
            height: 100%;
            margin: 20px;
          `}>
            { this.props.markers.map(marker => 
              {
                for (var mark in marker)
                {
                  return marker[mark].displayCard && <PantryCard name={mark} marker={ marker[mark] }/>
                }
              }
            ) }
          </div>
        </div>
        
        <div className={css`
          height: 100%;
          width: 100%;
        `}>
          <Map
            displayMode = { this.state.selectedOption }
            markers = { this.state.markers }
            getMarkers = { this._getMarkers }
          />
        </div>
      </div>
    );
  }
}