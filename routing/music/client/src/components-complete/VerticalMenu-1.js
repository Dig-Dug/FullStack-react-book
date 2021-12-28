import React from 'react';
//needed Link
import { Link } from 'react-router-dom';

import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    { //mapping to compose all Link Components. "to" prop: "albums/:albumId"
    //'item' for styling, goto components/AlbumsContainer.js
      albums.map((album) => (
        //here should swap with NavLink for styling
        <Link
          to={`/albums/${album.id}`}
          className='item'
          key={album.id}
        >
          {album.name}
        </Link>
      ))
    }
  </div>
);

export default VerticalMenu;
