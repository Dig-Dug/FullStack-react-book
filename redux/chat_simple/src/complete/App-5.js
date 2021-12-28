import React from 'react';

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(
          action.index + 1, state.messages.length
        ),
      ],
    };
  } else {
    return state;
  }
}

const initialState = { messages: [] };

const store = createStore(reducer, initialState);
//callback function, re-rendering every time state changes
class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
//rendering the view
  render() { //get messages from store, then render 2 children
    const messages = store.getState().messages;
//2 children
    return (
      <div className='ui segment'>
        {/**messageView needs list of messages */}
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
}
//single input field and submit button
class MessageInput extends React.Component {
  //define initial state
  state = {
    value: 'jij',
  };
//on change handler
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };
//when user clicks submit
  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: this.state.value,
    });
    this.setState({
      value: '',
    });
  };
//rendering input and button
  render() {
    return (
      <div className='ui input'>
        <input
          onChange={this.onChange}
          value={this.state.value}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
       </div>
    );
  }
}

class MessageView extends React.Component {
  handleClick = (index) => { //handleClick calls dispatch.
    //one argument index used in object to dispatch
    store.dispatch({
      type: 'DELETE_MESSAGE',
      index: index,
    });
  };

  render() { //render function map to create a list of msgs
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(index)}
      >
        {message}
      </div>
    ));
    return (
      <div className='ui comments'>
        {messages}
      </div>
    );
  }
}
//export 
export default App;
