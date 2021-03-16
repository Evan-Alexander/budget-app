import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("Should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseForm with an expense", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  // expect(wrapper).toMatchSnapshot();

  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  // expect(wrapper).toMatchSnapshot();
});

test("Should set DESCRIPTION on input change", () => {
  const value = "New Description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(0).simulate("change", {
    target: { value },
  });
  expect(wrapper.state("description")).toBe(value);
});

test("Should set NOTE on input change", () => {
  const value = "New Note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value },
  });
  expect(wrapper.state("note")).toBe(value);
});

test("Should set AMOUNT on input change", () => {
  const value = "23.25";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });
  expect(wrapper.state("amount")).toBe(value);
});

test("Should NOT set AMOUNT on incorrect input change", () => {
  const value = "23.2533";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });
  expect(wrapper.state("amount")).toBe("");
});
