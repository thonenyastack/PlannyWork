import Landing from "../Landing";
import React from "react";

import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Link, MemoryRouter } from "react-router-dom";

// import { ReactDOM, render } from "react-dom/client";

describe("landingpage", () => {
  it("render the landing page", () => {
    render(
      <MemoryRouter initialEntries={["/landing"]}>
        <Landing />
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getByText("Work Smart,Plan Easy")).toBeInTheDocument();
    expect(screen.getByText("Login/Register")).toHaveAttribute(
      "href",
      "/register"
    );
    // act(() => {
    //   const goLoginLink = document.querySelector("#Login");
    //   goLoginLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // });
    // expect(document.body.textContent).toBe("Register");
    // expect(screen.getByText("Register")).toBeInTheDocument();
    // screen.debug();
  });
});
