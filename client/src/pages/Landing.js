import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.png";
import Wrapper from "../assets/wrappers/Testing";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="logo" className="logo"></img>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Planning</span> App
          </h1>
          <p>Work Smart,Plan Easy</p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="event planning" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
