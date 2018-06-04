import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
    expect(getExpensesTotal([])).toBe(0);
});

test("should coorectly add up a single expense", () => {
    expect(getExpensesTotal([expenses[0]])).toBe(expenses[0].amount);
});

test("should correctly add up multiple expenses", () => {
    const total = expenses[0].amount + expenses[1].amount +
                        expenses[2].amount;
    expect(getExpensesTotal(expenses)).toBe(total);
});

