export default (expenses) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce((acc, currVal) => acc + currVal, 0);
};
