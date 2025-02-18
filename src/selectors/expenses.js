import moment from 'moment';

// get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter( (expense) => {
    const startDateMatch = startDate ? startDate.isSameOrBefore(moment(expense.createdAt), 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(moment(expense.createdAt), 'day') : true
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
}

export default getVisibleExpenses;