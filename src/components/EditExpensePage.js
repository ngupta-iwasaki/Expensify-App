import React from 'react';
import ExpenseForm from "./ExpenseForm";
import {startEditExpense, startRemoveExpense} from "../actions/expenses";
import {connect} from "react-redux";

export class EditExpensePage extends React.Component {
    
    onSubmit = (updates) => {
        this.props.startEditExpense(this.props.expense.id, updates);
        this.props.history.push("/");
    };

    onClick = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push("/");
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}/>
                    <button className="button button--secondary"
                            onClick={this.onClick}>
                        Remove Expense</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((exp) => 
        exp.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
    startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);