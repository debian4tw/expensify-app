import expensesReducer from "../../reducers/expenses";
import uuid from 'uuid';
import moment from "moment";
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([]);
});

test('should add expense', () => {
  const expense = {
    id: uuid(),
    description: 'test description',
    note: 'note',
    createdAt: moment(0),
    amount: 100
  }
  const state = expensesReducer(expenses, {type: 'ADD_EXPENSE', expense: expense});
  expect(state).toEqual([... expenses, expense]);
});

test('should remove expense', () => {
  const expenseId = expenses[1].id;
  const state = expensesReducer(expenses, {type: 'REMOVE_EXPENSE', id: expenseId});
  expect(state).toEqual([expenses[0], expenses[2]]);
});
test('should remove expense', () => {
  const expenseId = '-1';
  const state = expensesReducer(expenses, {type: 'REMOVE_EXPENSE', id: expenseId});
  expect(state).toEqual(expenses);
});

// should edit expense
test('should edit expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      description: 'test edited description'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], {...expenses[1], ...action.updates}, expenses[2]]);
});

test('should not edit expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      description: 'test edited description'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
