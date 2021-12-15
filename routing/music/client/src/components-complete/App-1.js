import React from 'react';
//import Route component
import { Route } from 'react-router-dom';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer-1';

import '../styles/App.css';
//AlbumsContainer will only render when visiting app at /albums, goto
// src/components/VerticalMenu.js, then src/components-complete/AlbumsContainer-2.js
const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Route path='/albums' component={AlbumsContainer} />
    </div>
  </div>
);

export default App;
