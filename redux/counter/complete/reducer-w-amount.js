/* eslint-disable no-console */

//addtional params on actions
function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + action.amount;
  } else if (action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}
//new param "amount"
const incrementAction = {
  type: 'INCREMENT',
  amount: 5,
};

console.log(reducer(0, incrementAction)); // -> 5
console.log(reducer(1, incrementAction)); // -> 6

const decrementAction = {
  type: 'DECREMENT',
  amount: 11,
};

console.log(reducer(100, decrementAction)); // -> 89
