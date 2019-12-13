import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {addExpense, editExpense, removeExpense} from './actions/expenses';
import {setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate} from './actions/filters';

import getVisibleExpenses from './selectors/expenses';

import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
/*
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log(getVisibleExpenses(state.expenses, state.filters));
})*/
/*
store.dispatch(sortByAmount());
store.dispatch(addExpense({
  description: 'gas bill',
  amount: 100,
  createdAt: 3333
}));

store.dispatch(addExpense({
  description: 'water bill',
  amount: 500,
  createdAt: 3322
}));

store.dispatch(addExpense({
  description: 'cinema',
  amount: 140,
  createdAt: 1000
}));

*/

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));