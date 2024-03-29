import React from 'react';
import uuid from 'uuid';
import { createStore } from 'redux';

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuid.v4(),
    };
    return {
      messages: state.messages.concat(newMessage),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: state.messages.filter((m) => (
        m.id !== action.id
      ))
    };
  } else {
    return state;
  }
}
//initialize to object with threads property, 2 threads in state.
const initialState = {
  activeThreadId: '1-fca2', // New state property id
  threads: [ // Two threads in state
    {
      id: '1-fca2', // hardcoded pseudo-UUID
      title: 'Buzz Aldrin',
      messages: [
        { // This thread starts with a single message already
          text: 'Twelve minutes to ignition.',
          timestamp: Date.now(),
          id: uuid.v4(), //hardcoding id, using clipped version of uuid library 
        },
      ],
    },
    {
      id: '2-be91',
      title: 'Michael Collins',
      messages: [],
    },
  ],
};

const store = createStore(reducer, initialState);

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState(); //read messages property and render to
    // 2 children
    const activeThreadId = state.activeThreadId; //which thread is active?
    const threads = state.threads; //wguch rhread from state?
    //Array "find" method to 'find' object with matching id to activeThreadId
    const activeThread = threads.find((t) => t.id === activeThreadId);

    //Give thread component the activeThread to render.
    return (
      <div className='ui segment'>
        <Thread thread={activeThread} />
      </div>
    );
  }
}

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      text: this.state.value,
    });
    this.setState({
      value: '',
    });
  };

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
//rename Component
class Thread extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id,
    });
  };
//this.props.thread.messages: create messages in render.
//still not possible to add ot delete msgs.
  render() {
    const messages = this.props.thread.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(message.id)}
      >
        <div className='text'>
          {message.text}
          <span className='metadata'>@{message.timestamp}</span>
        </div>
      </div>
    ));
    return (
      <div className='ui center aligned basic segment'>
        <div className='ui comments'>
          {messages}
        </div>
        <MessageInput />
      </div>
    );
  }
}

export default App;
