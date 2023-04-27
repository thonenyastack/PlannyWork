import { Outlet, Link } from "react-router-dom";

import Wrapper from "../../assets/wrappers/SharedLayout";
import {
  Navbar,
  StandardSideBar,
  MobileSideBar,
} from "../../components/ComponentIndex.js";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <MobileSideBar />
        <StandardSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
