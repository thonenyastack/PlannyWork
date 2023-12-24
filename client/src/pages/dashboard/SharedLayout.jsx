import { Outlet } from "react-router-dom";

import Wrapper from "../../assets/wrappers/SharedLayout";
import {
  Navbar,
  StandardSideBar,
  MobileSideBar,
} from "../../components/ComponentIndex";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <MobileSideBar />
        <StandardSideBar />
        <div className="main-content">
          <Navbar />
          <div className="dashboard-page">
            {/* Outlet:Placeholder enable Protected Route to render its children routes */}
            <Outlet />
          </div>
        </div>
      </main>
      <footer> &copy; 2022 Yan_Naing-Dev </footer>
    </Wrapper>
  );
};
export default SharedLayout;
