import React, { Component } from 'react';

import Album from './Album';
import { client } from '../Client';

//Add VerticalMenu, then nest it in render
import VerticalMenu from './VerticalMenu';

//hard-coded list
const ALBUM_IDS = [
  '23O4F21GDWiGd33tFN3ZgI',
  '3AQgdwMNCiN7awXch5fAaG',
  '1kmyirVya5fRxdjsPFDM05',
  '6ymZBbRSmzAvoSGmwAFoxm',
  '4Mw9Gcu1LT7JaipXdwrq1Q',
];
//stateful component
class AlbumsContainer extends Component {
  state = {
  //two states
    fetched: false, //keeping track, if mounted, getAlbums()
    albums: [],
  };

  componentDidMount() {
    this.getAlbums();
  }
//using client library, as argument is an array of album IDs expected
  getAlbums = () => { //first ask for login fake token(in server.js)
    client.setToken('D6W69PRgCoDKgHZGJmRUNA');
    client.getAlbums(ALBUM_IDS)
      .then((albums) => (
        this.setState({ //update state
          fetched: true,
          albums: albums,
        })
       ));
  };
//render icon or all albums in this.state.albums
  render() {
    if (!this.state.fetched) {
      return (
        <div className='ui active centered inline loader' />
      );
    } else {
      return (
        <div className='ui two column divided grid'>
          <div
            className='ui six wide column'
            style={{ maxWidth: 250 }}
          >
            {/* VerticalMenu will go here, goto AlbumsContainer-1.js*/}
            <VerticalMenu albums={this.state.albums} />
          </div>
          <div className='ui ten wide column'>
            {
              this.state.albums.map((a) => (
                <div
                  className='row'
                  key={a.id}
                >
                  <Album album={a} />
                </div>
              ))
            }
          </div>
        </div>
      );
    }
  }
}

export default AlbumsContainer;
