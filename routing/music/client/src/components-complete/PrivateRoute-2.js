/* eslint-disable */
import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from '../Client';

const PrivateRoute = (props) => (
  //passing routes like before, but specify a render function-
  //goto PrivateRoute-3.js
  <Route {...props} render={(props) => (
    client.isLoggedIn() ? (
      // render the component
      todo
    ) : (
      // render the redirect
      todo
    )
  )} />
);

export default PrivateRoute;
