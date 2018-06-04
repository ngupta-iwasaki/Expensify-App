const getExpensesTotal = (expenses) => {
    if(expenses.length === 0) {
        return 0;
    }
    return expenses.map(exp => exp.amount).reduce((acc, curVal) => 
        acc + curVal);
};

export default getExpensesTotal;