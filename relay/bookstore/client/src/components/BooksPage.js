/* eslint-disable react/prefer-stateless-function,react/sort-comp,class-methods-use-this,max-len */
import React from 'react';
import Relay from 'react-relay';
import Link from 'react-router/lib/Link';

import BookItem from './BookItem';
//this.props.viewer.books.edges <- calling renderBook on each edge
class BooksPage extends React.Component {
  render() {
    const books = this.props.viewer.books.edges.map(this.renderBook);

    return (
      <div className='sixteen wide column'>
        <h1>JavaScript Books</h1>
        <div className='ui grid centered'>
          { books }
        </div>
      </div>
    );
  }
//rendering a Link with a BookItem(a book found in bookEdge.node) component
  renderBook(bookEdge) {
    return (
      <Link
        to={`/books/${bookEdge.node.slug}`}
        key={bookEdge.node.slug}
        className='five wide column book'
      >
        <BookItem
          book={bookEdge.node}
        />
      </Link>
    );
  }
}

export default Relay.createContainer(BooksPage, {
  initialVariables: { //initialVariables(setting vars for queries)
    count: 100, //telling Relay to count to 100(first 100 books(too much
    //cos Relay deals for larger apps))
  },
  fragments: { //getFragment(cos of child´s fragment(queries parts) embedding)
    viewer: () => Relay.QL`
    fragment on Viewer {
      books(first: $count) {
        count
        edges {
          node {
            slug
            ${BookItem.getFragment('book')}
          }
        }
      }
    }
    `,
  },
});

