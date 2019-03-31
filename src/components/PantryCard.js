import React from 'react'
import { css } from 'emotion'

export class PantryCard extends React.Component {

  render() {
    return (
      <div className={css`
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
      `}>
        <div>
          { this.props.name &&  <p><b>Name: </b> { this.props.name }</p> }
          { this.props.marker.status === true && <p className={css`color: green`}>Safe!</p>}
          { this.props.marker.status === false && <p className={css`color: red`}>Not Safe</p>}
          { this.props.marker.fire === true && <p className={css`color: red`}><b>Fire Nearby!</b></p> }
          { this.props.marker.injured && <p><b>Injured: </b>{ this.props.marker.injured } </p> }
          { this.props.marker.resourcesNeeded && <p><b>Days of Food/Water Left: </b>{ this.props.marker.resourcesNeeded } </p> }
          { this.props.marker.collapsed && <p><b>Collapsed Buildings Nearby: </b>{ this.props.marker.collapsed } </p> }
          { this.props.marker.priority && <p><b>Priority: </b>{ this.props.marker.priority } </p> }
        </div>
      </div>
    );
  }
}