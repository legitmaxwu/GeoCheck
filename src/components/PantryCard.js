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
          <p>Status: { this.props.marker.status } </p>
        </div>
      </div>
    );
  }
}