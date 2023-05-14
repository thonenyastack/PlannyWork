import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { AppProvider, useAppContext } from "./appContext";

const TestAppProvider = () => {
  const { user } = useAppContext();
  return (
    <>
      <p>{user?.name}</p>
    </>
  );
};

describe("<AppProvider />", () => {
  test("provide expected AppContext to child elements", () => {});
});
