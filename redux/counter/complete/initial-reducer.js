/* eslint-disable no-console */

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else {
    //unmodified.
    return state;
  }
}

const incrementAction = { type: 'INCREMENT' };
//testing reducer, passing integers for state
//run in terminal  $./node_modules/.bin/babel-node app.js <- dunno how
//decrement actions in initial-reducer-w-dec.js
console.log(reducer(0, incrementAction)); // -> 1
console.log(reducer(1, incrementAction)); // -> 2
console.log(reducer(5, incrementAction)); // -> 6

const unknownAction = { type: 'UNKNOWN' };

console.log(reducer(5, unknownAction)); // -> 5
console.log(reducer(8, unknownAction)); // -> 8
