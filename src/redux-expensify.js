import { createStore, combineReducers } from 'redux';
import uuid from "uuid";
import AddExpensePage from './components/AddExpensePage';

const addExpense = (
    {
        description = '', 
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        amount,
        createdAt
    }

});

const removeExpense = ({id}) => ({
    type: "REMOVE_EXPENSE",
    id
});

const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

const expenseReducerDefaultState = [];
const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch(action.type) {
        case "ADD_EXPENSE":
            return [
                ...state,
                action.expense
            ];
        case "REMOVE_EXPENSE":
            return state.filter(({id}) => id !== action.id);
        case "EDIT_EXPENSE":
            return state.map(exp => 
                exp.id !== action.id ? exp : {...exp, ...action.updates});
        default:
            return state;
    }
};

const setTextFilter = (textFilter = '') => ({
    type: "SET_TEXT_FILTER",
    textFilter
});

const sortByDate = () =>({
    type: "SORT_BY_DATE",
});

const sortByAmount = () =>({
    type: "SORT_BY_AMOUNT",
});

const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
    
});

const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});

const filtersReducerDefaultState = {
    text: "",
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case "SET_TEXT_FILTER":
            return {...state, text: action.textFilter};
        case "SORT_BY_DATE":
            return {...state, sortBy: "date"};
        case "SORT_BY_AMOUNT":
            return {...state, sortBy: "amount"};
        case "SET_START_DATE":
            return {...state, startDate: action.startDate};
        case "SET_END_DATE":
            return {...state, endDate: action.endDate};
        default:
            return state;
    }
};
const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters:  filtersReducer
    })
);

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter(exp => {
        const startDateMatch = typeof startDate !== "number" || exp.createdAt >= startDate;
        const endDateMatch = typeof endDate !== "number" || exp.createdAt <= endDate;
        const textMatch = exp.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((exp1, exp2) =>
            sortBy === "amount" ? exp1.amount - exp2.amount : 
                                    exp1.createdAt - exp2.createdAt);
};

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

/*const expenseOne = store.dispatch(addExpense({description: "HI", amount: 100}));
const expenseTwo = store.dispatch(addExpense({description: "Coffee", amount: 200}));

store.dispatch(removeExpense({id: expenseOne.expense.id}));

store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());*/
/*store.dispatch(setStartDate(125));
store.dispatch(setStartDate());

store.dispatch(setEndDate(125));
store.dispatch(setEndDate());*/

const expenseOne = store.dispatch(addExpense({description: "Rent", amount: 100, createdAt: 20}));
const expenseTwo = store.dispatch(addExpense({description: "Coffee", amount: 200}));
store.dispatch(sortByAmount());
store.dispatch(sortByDate());


const demoState = {
  expenses: [{
    id: 'poijasdfhwer',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
