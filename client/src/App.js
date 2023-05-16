import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error, ProtectedRoute } from "./pages/PageIndex.js";
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  AllUsers,
} from "./pages/dashboard/DashboardIndex.js";

// import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Create Nested Route: Wrap all the dashboard routes inside Nested Protected route */}
        {/* Set Root "/" path as Protected at where validate user login.
         No logged in will be redireted to /register route */}
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
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
          <Route path="all-users" element={<AllUsers />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
