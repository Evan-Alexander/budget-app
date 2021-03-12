import React from "react";
import { connect } from "react-redux";
import { removeExpense } from "../actions/expenses";

const ExpenseListItem = ({
  dispatch,
  amount,
  createdAt,
  description,
  note,
  id,
}) => {
  return (
    <div>
      <p>{amount}</p>
      <p>{description}</p>
      <button
        onClick={() => {
          dispatch(removeExpense({ id }));
        }}
      >
        REMOVE
      </button>
    </div>
  );
};

export default connect()(ExpenseListItem);
