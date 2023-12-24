import React from "react";
import { createRoot } from "react-dom/client";

import { AppProvider } from "./context/appContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error, ProtectedRoute } from "./pages/PageIndex";
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  AllUsers,
} from "./pages/dashboard/DashboardIndex";
import UserJob from "./components/UserJob";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            {/* Create Nested Route: Wrap all the dashboard route components inside Nested Protected route */}
            {/* Set Root "/" path as Protected at where validate user login.
         Non logged-in user will be redireted to /register route */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
              }
            >
              {/* index prop Set Stats page as default display page */}
              <Route index element={<Stats />} />
              <Route path="/all-jobs" element={<AllJobs />} />
              <Route path="/add-job" element={<AddJob />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/user-job" element={<UserJob />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
