import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from '../Client';
// retunrs a Route component passing all its props
//simplest implementation of a higher order component
const PrivateRoute = (props) => (
  <Route {...props} />
);
//goto PrivateRoute-2.js
export default PrivateRoute;
