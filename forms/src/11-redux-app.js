import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './11-redux-reducer.js';
import { fetchPeople, savePeople } from './11-redux-actions.js';

const Form = require('./11-redux-form.js');
//creating store from reducer, thunkMiddleware allows asynchronousity
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
//connect necessary for redux optimization
const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form);

module.exports = class extends React.Component {
  static displayName = "11-redux-app";
//load people  list from server
  componentWillMount() {
    store.dispatch(fetchPeople());
  }
//provider component ready to use for children
  render() {
    return (
      <Provider store={store}>
        <ReduxForm />
      </Provider>
    );
  }
};
//redux automathized store connection. Here defined mapping between
//store and props
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    fields: state.person,
    people: state.people,
    saveStatus: state.saveStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (people) => {
      //asynchronous dispatching
      dispatch(savePeople(people));
    },
  };
}
