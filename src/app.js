import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {addExpense} from "./actions/expenses"
import {setTextFilter} from "./actions/filters"
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import AddExpensePage from './components/AddExpensePage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(addExpense({description: "water bill", amount:4500, createdAt:20}));
store.dispatch(addExpense({description: "fire bill", amount: 500, createdAt:10}));
store.dispatch(addExpense({description: "Rent", amount: 10, createdAt:100}));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
