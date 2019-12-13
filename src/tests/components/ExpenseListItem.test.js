import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListItem} from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render expenselistitem with expense', () => {
  const expense = expenses[0];
  const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});