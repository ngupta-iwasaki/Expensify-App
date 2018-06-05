import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {startSetExpenses, startAddExpense, addExpense, editExpense, removeExpense, setExpenses} from "../../actions/expenses";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
    const expenseData = {};
    expenses.forEach(expense => {
        expenseData[expense.id] = expense;
    });
    database.ref("expenses").set(expenseData);
});

test("test removeExpense action object", () => {
    const action = removeExpense({id: "12345aaa"});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "12345aaa"
    });
});

test("test editExpense action object", () => {
    const action = editExpense("peaches1234", {note: "this is note"});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "peaches1234",
        updates: {note: "this is note"}
    });
});

test("test addExpense action object provided vals", () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[0]
    });
});

test("should add expense to database and store", (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: "Mouse",
        amount: 4500,
        note: "this is not a cat",
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
  });

  test("should add expense to database and store default test", (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
  });

test("test setExpenses action generator", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses
    });
});

test("test setExpenses", () => {
    const action = {
        type: "SET_EXPENSES",
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});

test("shouldfetch the expenses from firebase", (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    });
  });