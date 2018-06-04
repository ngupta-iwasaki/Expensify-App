import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListitem";
import selectExpenses from "../selectors/expenses";
import ExpenseListFilter from "./ExpenseListFilter";

export const ExpenseList = (props) => (
    <div>
        {props.expenses.length === 0 ?
            <p>There are no expenses</p> : 
            props.expenses.map(exp => (
                <ExpenseListItem key={exp.id}
                                    {...exp} />))}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);