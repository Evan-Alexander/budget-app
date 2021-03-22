import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);
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

  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[0],
  });
});

test("Should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "Rent",
    amount: 43545,
    note: "Rent and such",
    createdAt: 1000,
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});
test("Should add expense with defaults to database and store", () => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0,
  };
  store
    .dispatch(startAddExpense(expenseDefaults))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults,
        },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

// BEFORE ASYNC DB STORAGE
// test("Should setup add expense action object with DEFAULT values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// });
