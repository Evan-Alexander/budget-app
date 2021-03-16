import moment from "moment";
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
} from "../../actions/filters";

test("Should generate set start date action object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0),
  });
});

test("Should generate set end date action object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0),
  });
});

test("Should generate set text filter action object with text value", () => {
  const action = setTextFilter("job");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "job",
  });
});

test("Should generate DEFAULT set text filter action object with default", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});

test("Should generate action object for sort by date", () => {
  expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" });
});

test("Should generate action object for sort by amount", () => {
  expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" });
});
