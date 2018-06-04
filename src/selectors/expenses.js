import moment from "moment";

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter(exp => {
        const createdAtMoment = moment(exp.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
        const textMatch = exp.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((exp1, exp2) =>
            sortBy === "amount" ? exp2.amount - exp1.amount: 
                                    exp2.createdAt - exp1.createdAt);
};

export default getVisibleExpenses;