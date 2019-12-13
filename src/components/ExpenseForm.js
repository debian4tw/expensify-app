import React from 'react';
import moment from 'moment';
import 'react-dates/initialize'; // necessary for latest version 
import { SingleDatePicker } from 'react-dates'; 

import {removeExpense} from '../actions/expenses';

const now = moment();
console.log(now.format());

export default class ExpenseForm extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100 ).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      formError: false
    };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description: description}));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({amount}));
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }

  };

  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description && !this.state.amount) {
      //set error state
      this.setState(() => ({formError: 'Please provide description and amount.'}));
    } else {
      this.setState(() => ({formError: ''}));
      console.log('submited');
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.formError && <p>{this.state.formError}</p>}
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input 
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <br />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={ (day) => false}
          />
          <br/>
          <textarea 
            placeholder="Add a note for expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
            ></textarea>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}