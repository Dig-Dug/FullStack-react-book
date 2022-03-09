/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Relay from 'react-relay';

import FancyBook from './FancyBook';

import '../styles/BookItem.css';

class BookItem extends React.Component {
  render() {
    return (
      <div className='bookItem'>
      {/* this.props.book pass to FancyBook component (3D Css effect) */}
        <FancyBook book={this.props.book} />
{/* bookMeta shows basic information */}
        <div className='bookMeta'>
          <div className='authors'>
            { this.props.book.authors.count }
            { this.props.book.authors.count > 1 ? ' Authors' : ' Author' }
          </div>
          <h2>{ this.props.book.name }</h2>
          <div className='tagline'>{ this.props.book.tagline }</div>
          <div className='description'>{ this.props.book.description }</div>
        </div>
      </div>
    );
  }
}
//fragment creation(key = book, type = Book)
export default Relay.createContainer(BookItem, {
  fragments: { //query asks for name, slug, number of pages etx
    book: () => Relay.QL`
    fragment on Book {
      name
      slug
      tagline
      coverUrl
      pages
      description
      authors {
        count
      }
    }
    `,
  },
});
