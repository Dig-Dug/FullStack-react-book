import React from 'react';

import '../styles/VerticalMenu.css';
//expects prop "albums", iterating and rendering a link for each album
//Goto src/components-complete/VerticalMenu-1.js
const VerticalMenu = ({ albums }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {/* Render album menu here */}
  </div>
);

export default VerticalMenu;
