/* eslint-disable no-shadow */
import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from '../Client';
//...spread operator(rest from props on PrivateRoute)
const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => (
    client.isLoggedIn() ? ( //if true, render the component
      React.createElement(component, props)
    ) : ( //otherwise redirect.
      <Redirect to={{
        pathname: '/login',
      }} />
    )
  )} />
);

export default PrivateRoute;
