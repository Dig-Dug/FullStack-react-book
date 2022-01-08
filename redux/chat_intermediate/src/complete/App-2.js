import React from 'react';
//import uuid library in package.json
import uuid from 'uuid';
import { createStore } from 'redux';


//reducer handling new messages objects
function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') { //create new object to represent new message
    const newMessage = {
      text: action.text, //text property
      timestamp: Date.now(), //generate timestamp and id//Unix milli seconds
      id: uuid.v4(),
    };
    return {
      messages: state.messages.concat(newMessage),//concat returns new array with states
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: state.messages.filter((m) => ( //return new array with every object that has no corresponding id to action
        m.id !== action.id
      ))
    };
  } else {
    return state;
  }
}

const initialState = { messages: [] };

const store = createStore(reducer, initialState);

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages = store.getState().messages;

    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
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
      text: this.state.value,  //use property name text for action
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
//whenever user clicks on msg.
class MessageView extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE', //use prop id
      id: id,
    });
  };

  render() {
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key={index}
        onClick={() => this.handleClick(message.id)} // Use `id`
      >
        <div className='text'> {/* Wrap message data in `div`
        message.text render message and timestamp */}
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
      </div>
    );
  }
}

export default App;
