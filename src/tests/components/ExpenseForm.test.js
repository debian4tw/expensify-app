import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import { SingleDatePicker } from 'react-dates';

test('should render expenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm/>);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit',{
    preventDefault: () => {}
  });
  expect(wrapper.state('formError').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = 'new description';
  wrapper.find('input').at(0).simulate('change', {
    target: {value: value}
  });
  expect(wrapper.state('description')).toBe(value);
});


test('should set note on textarea change', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = 'new note';
  wrapper.find('textarea').simulate('change', {
    target: {value: value}
  });
  expect(wrapper.state('note')).toBe(value);
});


test('should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = '23.50';
  wrapper.find('input').at(1).simulate('change', {
    target: {value: value}
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = '12.122';
  wrapper.find('input').at(1).simulate('change', {
    target: {value: value}
  });
  expect(wrapper.state('amount')).toBe('');
});


test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('formError')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
  //expect(onSubmitSpy).toHaveBeenCalledWith('AAA', 'tes');
});

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  const now = moment();

  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true});
  expect(wrapper.state('calendarFocused')).toBe(true);
});