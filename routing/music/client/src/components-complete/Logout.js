import React, { Component } from 'react';
//not API request required, logout removes token locally stored
//import Redirect...
import { Redirect } from 'react-router-dom';

import { client } from '../Client';
//login and logout composed, need to be added to App.js(App-4.js)
class Logout extends Component {

  constructor(props) {
    super(props);

    client.logout();
  }

  render() {
    return (
      <Redirect
        to='/login'
      />
    );
  }
}

export default Logout;
