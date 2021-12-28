
function createStore(reducer, initialState) {
  let state = initialState;

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
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
    return { //not splice cos array modification impure to redux
      //better a new object lice "ADD" above.
      messages: [
        //all elements from 0 to action.index, and from action.index + 1 to the end of the array
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(
            action.index + 1, state.messages.length
        ), //go down to test
      ],
    };
  } else {
    return state;
  }
}

const initialState = { messages: [] };

const store = createStore(reducer, initialState);

const addMessageAction1 = {
  type: 'ADD_MESSAGE',
  message: 'How does it look, Neil?',
};

store.dispatch(addMessageAction1);
const stateV1 = store.getState();

const addMessageAction2 = {
  type: 'ADD_MESSAGE',
  message: 'Looking good.',
};

store.dispatch(addMessageAction2);
const stateV2 = store.getState();

console.log('State v1:');
console.log(stateV1);
console.log('State v2:');
console.log(stateV2);
/// run babel-node App.js
const deleteMessageAction = {
  type: 'DELETE_MESSAGE',
  index: 0,
};

store.dispatch(deleteMessageAction);
const stateV3 = store.getState();

console.log('State v3:');
console.log(stateV3);

const App = { createStore, reducer, initialState }; // for tests
export default App;
