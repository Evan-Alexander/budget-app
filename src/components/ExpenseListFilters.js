import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount } from "../actions/filters";

const ExpenseListFilters = ({ dispatch, filters }) => {
  return (
    <div>
      <input
        type="text"
        value={filters.text}
        onChange={(e) => {
          dispatch(setTextFilter(e.target.value));
        }}
      />
      <select
        value={filters.sortBy}
        onChange={(e) => {
          e.target.value === "date"
            ? dispatch(sortByDate())
            : dispatch(sortByAmount());
        }}
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
    </div>
  );
};
const mapStateToProps = ({ filters }) => {
  return {
    filters,
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
