import Wrapper from "../assets/wrappers/StandardSidebar";
import { useAppContext } from "../context/appContext";
import logo from "../assets/images/logo.svg";
import NavLinks from "./NavLinks";

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
            <img src={logo} alt="PlannyWork" className="logo" />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default StandardSideBar;
