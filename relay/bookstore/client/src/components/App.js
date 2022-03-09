/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import TopBar from './TopBar';
import '../styles/App.css';
//before exporting App, wrap it using "witRouter" <- helper function
//Relay data not needed otherwise make App component a Relay container
class App extends React.Component {
  render() {
    return (
      <div className='ui grid'>
        <TopBar />
        <div className='ui grid container'>
          { React.cloneElement(this.props.children) }
        </div>
      </div>
    );
  }
}

export default withRouter(App);
