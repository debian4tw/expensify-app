
// setTextFilter
export const setTextFilter = (text = '') => ({
  type :'SET_TEXT_FILTER',
  text: text
});

export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

export const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate: startDate
});

export const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate: endDate
});