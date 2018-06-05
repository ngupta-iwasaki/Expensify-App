import React from "react";
import {shallow} from "enzyme";
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startRemoveExpense, startEditExpense, history, wrapper;

beforeEach(() => {
    startRemoveExpense = jest.fn();
    startEditExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage expense={expenses[0]}
                                        startEditExpense={startEditExpense}
                                        startRemoveExpense={startRemoveExpense} 
                                        history={history}/>);
});

test("should render EditExpensePage correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle startEditExpense", () => {
    const updates = {amount: "4"}
    wrapper.find("ExpenseForm").prop("onSubmit")(updates);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, updates);
});

test("should handle startRemoveExpense", () => {
    const id = {id: expenses[0].id}
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startRemoveExpense).toHaveBeenLastCalledWith(id);
});

