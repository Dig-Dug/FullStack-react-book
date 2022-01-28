import React from 'react';
import uuid from 'uuid';
import { createStore } from 'redux';
//2 different reducers
function reducer(state, action) {
  //returning a whole new object
  return { //keys, activeThreadId(property), action second argument
    activeThreadId: activeThreadIdReducer(state.activeThreadId, action),
    //same strategy as above
    threads: threadsReducer(state.threads, action),
  };
}
//state activeThreadId? string id of thread?
function activeThreadIdReducer(state, action) {
  if (action.type === 'OPEN_THREAD') { //return string.
    return action.id;
  } else {
    return state;
  }
}
//rename from reducer to threadsReducer. Look up function "reducer"
function threadsReducer(state, action) { //state updating(a part only(
  //state is an array of threads))
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuid.v4(),
    };
    const threadIndex = state.findIndex(
      (t) => t.id === action.threadId
    );
    const oldThread = state[threadIndex];
    const newThread = {
      ...oldThread,
      messages: oldThread.messages.concat(newMessage),
    };
//return array of threads.
    return [
      ...state.slice(0, threadIndex),
      newThread,
      ...state.slice(
        threadIndex + 1, state.length
      ),
    ];
  } else if (action.type === 'DELETE_MESSAGE') {
    const threadIndex = state.findIndex(
      (t) => t.messages.find((m) => (
        m.id === action.id
      ))
    );
    const oldThread = state[threadIndex];

    const newThread = {
      ...oldThread,
      messages: oldThread.messages.filter((m) => (
        m.id !== action.id
      )),
    };

    return [
      ...state.slice(0, threadIndex),
      newThread,
      ...state.slice(
        threadIndex + 1, state.length
      ),
    ];
  } else {
    return state;
  }
}

const initialState = {
  activeThreadId: '1-fca2',
  threads: [
    {
      id: '1-fca2',
      title: 'Buzz Aldrin',
      messages: [
        {
          text: 'Twelve minutes to ignition.',
          timestamp: Date.now(),
          id: uuid.v4(),
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
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const threads = state.threads;
    const activeThread = threads.find((t) => t.id === activeThreadId);

    const tabs = threads.map(t => (
      {
        title: t.title,
        active: t.id === activeThreadId,
        id: t.id,
      }
    ));

    return (
      <div className='ui segment'>
        <ThreadTabs tabs={tabs} />
        <Thread thread={activeThread} />
      </div>
    );
  }
}

/* eslint-disable react/prefer-stateless-function */

class ThreadTabs extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'OPEN_THREAD',
      id: id,
    });
  };

  render() {
    const tabs = this.props.tabs.map((tab, index) => (
      <div
        key={index}
        className={tab.active ? 'active item' : 'item'}
        onClick={() => this.handleClick(tab.id)}
      >
        {tab.title}
      </div>
    ));
    return (
      <div className='ui top attached tabular menu'>
        {tabs}
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
      threadId: this.props.threadId,
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

class Thread extends React.Component {
  handleClick = (id) => {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id,
    });
  };

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
        <MessageInput threadId={this.props.thread.id} />
      </div>
    );
  }
}

export default App;
