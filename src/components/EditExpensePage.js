import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  
  onSubmit = (expense) => {
    console.log(expense);
    console.log(this.props.expense);
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  onClick = () => {
    this.props.removeExpense(this.props.expense.id);
    this.props.history.push('/');
  }

  render(){
    return  (
      <div>
        some text from  EDIT expense id this.props.match.params.id
        <ExpenseForm expense={this.props.expense} 
          onSubmit={this.onSubmit}
          />
          <button onClick={this.onClick}>Remove
          </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (data) => dispatch(removeExpense(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);