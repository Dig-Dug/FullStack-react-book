/* eslint-disable no-underscore-dangle, react/sort-comp */
import React from 'react';
import Relay from 'react-relay';
import Link from 'react-router/lib/Link';

import BookItem from './BookItem';
import FancyBook from './FancyBook';

import '../styles/BookPage.css';

class BookPage extends React.Component {
  renderAuthor(authorEdge) {  //renderAuthor function
    return (
      <Link
        key={authorEdge.node._id}
        to={`/authors/${authorEdge.node._id}`}
        className='column'
      >
        <div className='ui fluid card'>
          <div className='image'>
            <img src={authorEdge.node.avatarUrl}
              alt={authorEdge.node.name}
            />
          </div>
          <div className='content'>
            <div className='header'>{authorEdge.node.name}</div>
          </div>
        </div>
      </Link>
    );
  }
//semantic UI classes. For each author edge call renderAuthor()
  render() {
    const { book } = this.props;
    const authors = book.authors.edges.map(this.renderAuthor);
    return (
      <div className='bookPage sixteen wide column'>
        <div className='spacer row' />

        <div className='ui grid row'>
          <div className='six wide column'>
            <FancyBook book={book} />
          </div>

          <div className='ten wide column'>
            <div className='content ui form'>

              <h2>{book.name}</h2>

              <div className='tagline hr'>
                {book.tagline}
              </div>

              <div className='description'>
                <p>
                  {book.description}
                </p>
              </div>

            </div>

            <div className='ten wide column authorsSection'>
              <h2 className='hr'>Authors</h2>
              <div className='ui three column grid link cards'>
                {authors}
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }

}
//fragment loading Book metadata check render() up
export default Relay.createContainer(BookPage, {
  fragments: {
    book: () => Relay.QL`
    fragment on Book { 
      id
      name
      tagline
      coverUrl
      description
      pages
      authors(first: 100) {
        edges {
          node {
            _id
            name
            avatarUrl
            bio
          }
        }
      }
    }`,
  },
});

