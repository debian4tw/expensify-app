import moment from 'moment';
import filtersReducer from "../../reducers/filters";


test('should setup default filter values', () => {
  const state= filtersReducer(undefined, { type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sort by to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sort by to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  };
  const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'});
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const textFilter = 'pepe';
  const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: textFilter});
  expect(state.text).toBe(textFilter);
});

test('should set startDate filter', () => {
  const startDate = moment(0);
  const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate: startDate});
  expect(state.startDate).toBe(startDate);
});

test('should set endDate filter', () => {
  const endDate = moment(0);
  const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate: endDate});
  expect(state.endDate).toBe(endDate);
});