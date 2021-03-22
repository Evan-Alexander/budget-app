import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt };
  });
  database
    .ref("expenses")
    .set(expenseData)
    .then(() => done());
});
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
test("Should add expense with defaults to database and store", (done) => {
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

test("Should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
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
