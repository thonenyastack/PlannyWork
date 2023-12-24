import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { AppProvider, useAppContext } from "./appContext";

const TestAppProvider = () => {
  const { jobLocation, jobType } = useAppContext();
  return (
    <>
      <p>
        {jobLocation} {jobType}
      </p>
    </>
  );
};

const renderTestComponent = () =>
  render(
    <AppProvider>
      <TestAppProvider />
    </AppProvider>
  );
describe("<AppProvider />", () => {
  it("provide expected AppContext to child elements", () => {
    // const expectedJobLocation = "Yangon";
    renderTestComponent();

    expect(screen.getByText(/Yangon/i)).toBeInTheDocument();
    expect(screen.getByText(/Remote/i)).toBeInTheDocument();
  });
});
