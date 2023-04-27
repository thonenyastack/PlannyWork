import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error, ProtectedRoute } from "./pages/PageIndex.js";
import {
  AllJobs,
  AllMeetings,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  CreateMeeting,
  AllUsers,
} from "./pages/dashboard/DashboardIndex.js";

import styled from "styled-components";

const Button = styled.button`
  background: red;
  color: white;
  font-size: 2rem;
`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="all-meetings" element={<AllMeetings />} />
          <Route path="create-meeting" element={<CreateMeeting />} />
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
