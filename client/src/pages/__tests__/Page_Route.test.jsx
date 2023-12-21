import { describe, it, expect } from "vitest";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { RenderWithRouter } from "../../utils/RenderWithRouter";
import Register from "../Register";
import Landing from "../Landing";

describe("Register", () => {
  it("should ensure the page is rendered", () => {
    RenderWithRouter(<Landing />);

    expect(screen.getByText("Work Smart,Plan Easy")).toBeInTheDocument();
  });
  it("should navigate to the Register Page", () => {
    RenderWithRouter(<Landing />, [
      {
        path: "/register",
        element: <h3>Register</h3>,
      },
    ]);
    fireEvent.click(screen.getByText("Login/Register"));

    // Use more specific method like getByRole rather than generic lookup getByText.
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Register"
    );
  });
});
