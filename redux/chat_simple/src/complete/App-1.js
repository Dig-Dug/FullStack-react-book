
function createStore(reducer, initialState) {
   //state is going to be an object, initialize state
  let state = initialState;
  // ...

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
  };
}
    //reducers should treat state object as immutable
function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return { //append new message to the end in array of state
      //don´t use push, redux is based on pure functions(value = args && !var(mutateOutsideFunctions))
     //return new state obj(messages)
      messages: state.messages.concat(action.message),
    };
  } else {//unmodified
    return state;
  }
}
//object array of strings
const initialState = { messages: [] };
//initialize store
const store = createStore(reducer, initialState);
//2 actions: ADD and DELETE
const addMessageAction1 = {
  type: 'ADD_MESSAGE',
  message: 'How does it look, Neil?', //property message
};

store.dispatch(addMessageAction1);
//save state version 1
const stateV1 = store.getState();

const addMessageAction2 = {
  type: 'ADD_MESSAGE',
  message: 'Looking good.',
};

store.dispatch(addMessageAction2);
//save state version 2
const stateV2 = store.getState();
//to see them ./node_modules/.bin/babel-node src/APP.js
console.log('State v1:');
console.log(stateV1);
console.log('State v2:');
console.log(stateV2);

const App = { createStore, reducer, initialState }; // for tests
export default App;
