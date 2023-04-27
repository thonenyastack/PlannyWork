import Wrapper from "../assets/wrappers/BigSidebar.js";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
// import { NavLink } from "react-router-dom";
// import links from "../utils/links.js";
import Logo from "./Logo";
import NavLinks from "./NavLinks.js";

const StandardSideBar = () => {
  const { showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default StandardSideBar;
