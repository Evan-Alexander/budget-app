import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

// toEqual => great for comparing objects
// expect.any(String), Great for asserting a TYPE of a value when you don't know what the value will be.

test("Should setup remove expense action object", () => {
  const action = removeExpense({ id: "abcdef" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "abcdef",
  });
});

test("Should setup edit expense action object", () => {
  const action = editExpense("abcde", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "abcde",
    updates: {
      note: "New note value",
    },
  });
});

test("Should setup add expense action object with PROVIDED values", () => {
  const expenseData = {
    description: "Rent",
    amount: 109500,
    createdAt: 1000,
    note: "Rent for April",
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test("Should setup add expense action object with DEFAULT values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
    },
  });
});
