import { useAppContext } from "../context/appContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
// import { useAppContext } from "../context/appContext";

const NavLinks = () => {
  // filter rendered link to restrict access to team link for normal user
  const { user } = useAppContext();
  const role = user.role;
  return (
    <div className="nav-links">
      {links
        .filter((link) => {
          if (role == "user") {
            return link.text != "Teams";
          } else {
            return link;
          }
        })
        .map((link) => {
          const { id, text, path, icon } = link;

          return (
            <NavLink
              to={path}
              key={id}
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
