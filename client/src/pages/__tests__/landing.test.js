import Landing from "../Landing";
import React from "react";
import { ReactDOM, render } from "react-dom";

describe("landingpage", () => {
  test("render the landing page", () => {
    render(<Landing />);
  });
});
