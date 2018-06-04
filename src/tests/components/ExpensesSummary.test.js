import React from "react";
import {shallow} from "enzyme";
import {ExpensesSummary} from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render ExpensesSummary with 1 expense", () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1}
                                expensesTotal={1294}/>);
expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary with multiple expenses", () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={2}
                                            expensesTotal={3000}/>);
    expect(wrapper).toMatchSnapshot();
});