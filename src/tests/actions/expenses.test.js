import {addExpense, editExpense, removeExpense} from "../../actions/expenses";

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

test("test addExpense action object default vals", () => {
    const action = addExpense();
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            id: expect.any(String),
            description: "",
            note: "",
            amount: 0,
            createdAt: 0
        }
    });
});

test("test addExpense action object provided vals", () => {
    const expenseData = {
        description: "fire bill", 
        amount: 500, 
        createdAt: 10,
        note: "noteeesss"
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            id: expect.any(String),
            ...expenseData,
        }
    });
});