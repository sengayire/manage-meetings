import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Login from "../src/components/Login";

describe("Login component", () => {
  const shallowWrapper = shallow(<Login />);

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login />, div);
  });

  it("renders correctly", () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it("renders the correct heading text", () => {
    expect(shallowWrapper.find("header>h1")).toHaveLength(1);
    expect(shallowWrapper.find("header>h1").text()).toBe("CONVERGE");
  });

  it("renders the correct mrm introduction text", () => {
    const mrmIntro =
      "Meet the Meeting Room Appthat your meeting room app aspires to be.";
    expect(shallowWrapper.find("#converge-intro")).toHaveLength(1);
    expect(shallowWrapper.find("#converge-intro").text()).toBe(mrmIntro);
  });

  it("renders the tablet image", () => {
    expect(shallowWrapper.find("#dark-tablet img")).toHaveLength(1);
  });

  it("renders login button", () => {
    //   check whether login button exists
    expect(shallowWrapper.find(".btn-signin")).toHaveLength(1);
  });
});