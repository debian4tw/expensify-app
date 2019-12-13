import { createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy: decrementBy
});

const resetCount = () => ({
  type: 'RESET'
});

const setCount = ({count}) => ({
  type: 'SET',
  count: count
});


//Reducers
//1. Redurecrs are pure functions
//2. Never change state or action

/*
//impure function
let a = 10;
const add = (b) => {
  return a+b;
}
//pure function
const add = (a, b) => {
  return a+b;
}
*/
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT': 
      return {
        count: state.count - action.decrementBy
      }
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET': 
      return {
        count: 0
      }
    default: 
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

//unsubscribe();

store.dispatch(incrementCount());

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount({decrementBy: 100}));

store.dispatch(resetCount());

store.dispatch(decrementCount({decrementBy: 100}));

store.dispatch(setCount({count: 130}));

store.dispatch(resetCount());
