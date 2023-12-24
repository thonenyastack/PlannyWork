import Wrapper from "../assets/wrappers/MobileSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";

import logo from "../assets/images/logo.svg";
import NavLinks from "./NavLinks";

const MobileSideBar = () => {
  const { showSideBar, toggleSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes></FaTimes>
          </button>
          <header>
            <img src={logo} alt="PlannyWork" className="logo" />
          </header>
          <NavLinks toggleSideBar={toggleSideBar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default MobileSideBar;
