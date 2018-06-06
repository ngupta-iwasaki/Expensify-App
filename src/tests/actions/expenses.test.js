import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {startSetExpenses, 
        startAddExpense, 
        startRemoveExpense,
        startEditExpense,
        addExpense, 
        editExpense, 
        removeExpense, 
        setExpenses} from "../../actions/expenses";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const uid = "aba1231314561";
const defaultAuthState = {auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
    const expenseData = {};
    expenses.forEach(expense => {
        expenseData[expense.id] = expense;
    });
    database.ref(`users/${uid}/expenses`).set(expenseData);
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
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
  });

  test("should add expense to database and store default test", (done) => {
    const store = createMockStore(defaultAuthState);
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
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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

test("should fetch the expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    });
  });

  test("should remove expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;

    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

  test("should edit expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = {
        description: "BUS"
    };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val().description).toBe(updates.description);
      done();
    });
});