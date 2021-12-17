import React from 'react';
// path "/" should lead to albums- best practice
import { Route, Redirect } from 'react-router-dom';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer-2';

import '../styles/App.css';

const App = () => ( 
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'> {/* path "/" should lead to albums*/}
      <Route path='/albums' component={AlbumsContainer} />
{/* exact : only "/" should lead to albums*/}
      <Route exact path='/' render={() => (
        <Redirect
          to='/albums'
        />
      )} />
    </div>
  </div>
);

export default App;
