import Landing from "../Landing";
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// import { ReactDOM, render } from "react-dom/client";

describe("landingpage", () => {
  it("render the landing page", () => {
    render(<Landing />);
    screen.debug();
  });
});
