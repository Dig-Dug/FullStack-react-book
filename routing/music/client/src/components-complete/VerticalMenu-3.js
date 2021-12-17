import React from 'react';
//import NavLink
import { NavLink } from 'react-router-dom';

import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums, albumsPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {/**when "to" prop, a mix of 2 classes, goto VerticalMenu.js */
      albums.map((album) => (
        <NavLink
          to={`${albumsPathname}/${album.id}`}
          activeClassName='active'
          className='item'
          key={album.id}
        >
          {album.name}
        </NavLink>
      ))
    }
  </div>
);

export default VerticalMenu;
