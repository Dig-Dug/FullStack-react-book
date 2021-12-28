/* eslint-disable no-console */
/* eslint-disable no-shadow */

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + action.amount;
  } else if (action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}
//store accepts a single argument "reducer" <-Factory Pattern
function createStore(reducer) {
  //private state initialized at 0
  let state = 0;
//returns state, granting access
  const getState = () => (state);
/* dispatch to send actions to store
dispatch calls reducer function passed as argument with current
state and action */
  const dispatch = (action) => {
    state = reducer(state, action);
  };
//return object
  return {
    getState,
    dispatch,
  };
}

const store = createStore(reducer);

const incrementAction = {
  type: 'INCREMENT',
  amount: 3,
};
//testing
store.dispatch(incrementAction);
console.log(store.getState()); // -> 3
store.dispatch(incrementAction);
console.log(store.getState()); // -> 6

const decrementAction = {
  type: 'DECREMENT',
  amount: 4,
};

store.dispatch(decrementAction);
console.log(store.getState()); // -> 2
