import React from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";

import { connect } from "react-redux";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: null,
    };
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    e.target.value === "date"
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };

  render() {
    return (
      <div className="content-container">
        <div className="filter-container">
          <div className="filter-container__item">
            <input
              className="text-input"
              placeholder="Search expenses"
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="filter-container__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="filter-container__item">
            <DateRangePicker
              className="filter-container__item"
              startDateId="MyDatePickerStart"
              endDateId="MyDatePickerEnd"
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filters }) => {
  return {
    filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
