import React from "react";

const ExpenseListItem = ({ amount, createdAt, description, note }) => {
  return (
    <div>
      <p>{amount}</p>
      <p>{description}</p>
    </div>
  );
};

export default ExpenseListItem;
