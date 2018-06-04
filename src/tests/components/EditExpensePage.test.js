import React from "react";
import {shallow} from "enzyme";
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let removeExpense, editExpense, history, wrapper;

beforeEach(() => {
    removeExpense = jest.fn();
    editExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage expense={expenses[0]}
                                        editExpense={editExpense}
                                        removeExpense={removeExpense} 
                                        history={history}/>);
});

test("should render EditExpensePage correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
    const updates = {amount: "4"}
    wrapper.find("ExpenseForm").prop("onSubmit")(updates);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, updates);
});

test("should handle removeExpense", () => {
    const id = {id: expenses[0].id}
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(removeExpense).toHaveBeenLastCalledWith(id);
});

