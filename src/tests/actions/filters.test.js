import moment from "moment";
import {
    sortByDate, 
    sortByAmount, 
    setStartDate, 
    setEndDate,
    setTextFilter} from "../../actions/filters";

test("Test generate sortByDate action generator", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE",
    });
});

test("Test generate sortByAmount action generator", () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: "SORT_BY_AMOUNT",
    });
});

test("Test generate setStartDate action generator", () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    });
});


test("Test generate setEndDate action generator", () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    });
});

test("Test generate setTextFilter action generator with default vals", () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        textFilter: ""
    });
});

test("Test generate setTextFilter action generator with provided vals", () => {
    const action = setTextFilter("bill");
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        textFilter: "bill"
    });
});