import Relay from 'react-relay';
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from './components/App';
import AuthorPage from './components/AuthorPage';
//App the parent route, child route uses AuthorPage component
const AuthorQueries = {
//querie here defined will be exec (querie ->author(var -> $authorId))
//$authorId <- route path parameter
  author: () => Relay.QL`
  query { 
    author(id: $authorId)
  }`,
};
//this route says whatever comes after author will be taken
//as authorId(var to Relay query)
export default (
  <Route
    path='/'
    component={App}
  >
    <Route
      path='/authors/:authorId'
      component={AuthorPage}
      queries={AuthorQueries}
    />
  </Route>
);
