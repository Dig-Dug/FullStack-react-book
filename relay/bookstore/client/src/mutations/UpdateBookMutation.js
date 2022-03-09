import React from 'react';
import Relay from 'react-relay';
import RelayMutationType from 'react-relay/lib/RelayMutationType';


//create a Relay.Mutation subclass
export default class UpdateBookMutation extends Relay.Mutation {
  getMutation() { //updateBook is the node
    return Relay.QL`mutation { updateBook }`;
  }
//send new values mutation passed in updateBookInput <- getVariables
  getVariables() { //description how to create args for updateBookInput
    //with this.props
    return {
      id: this.props.id, //book id will be the way of choice for reference
      name: this.props.name,
      tagline: this.props.tagline,
      description: this.props.description,
    };
  }
//specs
  static fragments = {
    book: () => Relay.QL`
      fragment on Book {
        id
        name
        tagline
        description
      }
    `,
  }
//fat query capture everything that might have changed
  getFatQuery() { //GraphQl query/changedBook object of type book
    return Relay.QL`
      fragment on updateBookPayload {
        changedBook
      }
    `;
  }

  getConfigs() {
    return [ {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        changedBook: this.props.book.id,
      },
    } ];
  }

  // Let's craft an optimistic response that mimics the shape of the
  // addBookPayload, as well as the values we expect to receive.
  getOptimisticResponse() {
    const { book, id, name, tagline, description } = this.props;

    const newBook = Object.assign({}, book, { id, name, tagline, description });

    const optimisticResponse = {
      changedBook: newBook,
    };
    console.log('optimisticResponse', optimisticResponse);
    return optimisticResponse;
  }
}
