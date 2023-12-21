import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { it, describe, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
import { Landing, Register, Error, ProtectedRoute } from "./pages/PageIndex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  AllUsers,
} from "./pages/dashboard/DashboardIndex";

import { AppProvider } from "./context/appContext";
