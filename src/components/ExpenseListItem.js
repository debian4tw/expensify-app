import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
// desc, amount, createdAt

export const ExpenseListItem = (props) => (
  <div>
    <Link to={`/edit/${props.id}`}>
      <h3>{props.description}</h3>
    </Link>
    <p>{props.amount} - {props.createdAt}</p>

  </div>
);


export default connect()(ExpenseListItem);