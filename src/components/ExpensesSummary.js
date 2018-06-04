import React from "react";
import {connect} from "react-redux";
import numeral from "numeral";
import getExpensesTotal from "../selectors/expenses-total";
import getVisibleExpenses from "../selectors/expenses";

export const ExpensesSummary = (props) => (
    <h1>
        Viewing {props.expenseCount}
         {props.expenseCount === 1 ? " expense " : " expenses "}
         totalling {numeral(props.expensesTotal / 100).format("$0,0.00")} 
    </h1>
);

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);