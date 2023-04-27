import links from "../utils/links";
import { NavLink } from "react-router-dom";
// import { useAppContext } from "../context/appContext";

const NavLinks = ({ toggleSideBar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSideBar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icons">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
