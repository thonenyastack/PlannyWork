import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaUser } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const { user, toggleSideBar, logoutUser } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <button
            type="button"
            className={showLogout ? "dropdown show-dropdown" : "dropdown"}
            onClick={logoutUser}
          >
            logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
