import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


let editExpense, removeExpense, history, wrapper, match;

beforeEach( () => {
  //onSubmit = jest.fn();
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = {push: jest.fn()};
  match = {params: {id: expenses[0].id}}

  wrapper = shallow(
    <EditExpensePage
      expense={expenses[0]} 
      editExpense={editExpense} 
      removeExpense={removeExpense}
      history={history}
    />);

});


test('should render edit expense page', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id);
  expect(history.push).toHaveBeenLastCalledWith('/');
});