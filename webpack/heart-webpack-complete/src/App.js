/* eslint-disable react/prefer-stateless-function */ /* eslint-disable jsx-quotes */
import React, { Component } from 'react';
//no js imports!
import logo from './logo.svg';
import './App.css';
//ES6 module, no state or props
//Self contained react app
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
