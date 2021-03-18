import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should correctly render ExpensesSummary with 1 expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={235} />
  );
});

test("should correctly render ExpensesSummary with several expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={22} expensesTotal={23542324} />
  );
});
