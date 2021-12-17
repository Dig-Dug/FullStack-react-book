import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer-3';
//adding login and logout
import Login from './Login-1';
import Logout from './Logout';

import '../styles/App.css';

const App = () => ( //adding Route components for each of them. Remove the
  //manual setToken from "getAlbums" example in goto -> AlbumsContainer.js,
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Route path='/albums' component={AlbumsContainer} />

      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />

      <Route exact path='/' render={() => (
        <Redirect
          to='/albums'
        />
      )} />
    </div>
  </div>
);

export default App;
