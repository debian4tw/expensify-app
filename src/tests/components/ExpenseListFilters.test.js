import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

console.log(<ExpenseListFilters />)

beforeEach(() => {
  setTextFilter = jest.fn(); 
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters 
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    />
  );
}); 

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
})

test('should handle text change', () => {
  const text = 'pepe';
  wrapper.find('input').simulate('change', {
    target: {value: text}
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(text);
});


test('should sort by date', () => {
  const value = 'date';
  wrapper.find('select').simulate('change', {
    target: {value: value}
  });
  expect(sortByDate).toHaveBeenCalled();
});


test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: {value: value}
  });
  expect(sortByAmount).toHaveBeenCalled();
});



test('should handle date changes', () => {
  const date = '10/10/2010';
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate: date, endDate: date});
  expect(setStartDate).toHaveBeenLastCalledWith(date);
  expect(setEndDate).toHaveBeenLastCalledWith(date);
});


test('should handle date focus change', () => {
  const calendarFocused = 'endDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
  expect(wrapper.stated('calendarFocused')).toBe(calendarFocused);
});