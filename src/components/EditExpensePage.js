import React from 'react';
import ExpenseForm from "./ExpenseForm";
import {editExpense, removeExpense} from "../actions/expenses";
import {connect} from "react-redux";

export class EditExpensePage extends React.Component {
    
    onSubmit = (updates) => {
        this.props.editExpense(this.props.expense.id, updates);
        this.props.history.push("/");
    };

    onClick = () => {
        this.props.removeExpense({id: this.props.expense.id});
        this.props.history.push("/");
    };

    render() {
        return (
            <div>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}/>
                <button onClick={this.onClick}>
                    Remove </button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((exp) => 
        exp.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    removeExpense: (id) => dispatch(removeExpense(id)),
    editExpense: (id, updates) => dispatch(editExpense(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);