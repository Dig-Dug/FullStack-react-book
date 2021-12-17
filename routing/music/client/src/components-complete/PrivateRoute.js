/* eslint-disable no-shadow */
import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from '../Client';

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => (
    client.isLoggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ //passing state goto login.js
        pathname: '/login',
        state: { from: props.location },
      }} />
    )
  )} />
);

export default PrivateRoute;
