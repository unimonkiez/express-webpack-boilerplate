import React, { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        SPINNER
      </div>
    );
  }
}
