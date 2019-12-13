import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = ({ 
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description: description,
      note: note,
      createdAt: createdAt,
      amount: amount
    }
  });

const removeExpense = ({id}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates: updates
});

//Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {...expense, ...action.updates};
        }
        return expense;
      });
        
    default:
      return state;
  }
}



// setTextFilter
const setTextFilter = (text = '') => ({
  type :'SET_TEXT_FILTER',
  text: text
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate: startDate
});

const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate: endDate
});

//Filters reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { 
        ...state, 
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: action.sortBy
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: action.sortBy
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
}


// get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter( (expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
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



//Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
})


const expOne = store.dispatch(addExpense({
  description: 'my description',
  note: 'some note',
  amount: 5500,
  createdAt: 1000
}));
const expTwo = store.dispatch(addExpense({
  description: 'my djhasgdjhsag',
  note: 'some nodsdsate',
  amount: 300,
  createdAt: 3000
}));
/*
store.dispatch(removeExpense({
  id: expOne.expense.id
}))

store.dispatch(editExpense(
  expTwo.expense.id, {amount: 500, description: 'updated desc'}
));


store.dispatch(setTextFilter('rent'));
*/
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

/*store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(332));*/
store.dispatch(setTextFilter('d'));


const demoState = {
  expenses: [{
    id: 'kjdhsjkdh',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined 

  }
};