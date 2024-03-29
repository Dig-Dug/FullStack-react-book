/* eslint-disable react/prefer-stateless-function,jsx-a11y/img-has-alt */
import React from 'react';
import Relay from 'react-relay';
import Link from 'react-router/lib/Link';

import '../styles/AuthorPage.css';

class AuthorPage extends React.Component {
  render() {
    const { author } = this.props;

    return (
      <div>
        <img src={author.avatarUrl} />
        <h1>{author.name}</h1>
        <p>
          {/* e.g. '2 Books' or '1 Book' */}
          {author.books.count}
          {author.books.count > 1 ? ' Books' : ' Book'}
        </p>
        <p>{author.bio}</p>
      </div>
    );
  }
}
//Writing a fragment
//key names must match key names of queries(author(in AuthorQueries))
//fragment key name must also be author(in AuthorPage fragments)
export default Relay.createContainer(AuthorPage, {
  fragments: {
    author: () => Relay.QL`
    fragment on Author { 
      name
      avatarUrl
      bio
      books {
        count
      }
    }`,
  },
});

