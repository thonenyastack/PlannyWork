import { useState, useEffect } from "react";
// import Logo from "../components/Logo";
import { Logo, FormRow, Alert } from "../components/ComponentIndex";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
// import { LOGIN_USER_BEGIN } from "../context/actions";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [regFormValue, setFormValue] = useState(initialState);
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();
  // const state = useAppContext();
  // console.log(state);
  const toggleMember = () => {
    setFormValue({ ...regFormValue, isMember: !regFormValue.isMember });
  };
  const handleChange = (e) => {
    setFormValue({ ...regFormValue, [e.target.name]: e.target.value });
    // console.log(regFormValue);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = regFormValue;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    // console.log(regFormValue);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{regFormValue.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!regFormValue.isMember && (
          <FormRow
            type="text"
            name="name"
            value={regFormValue.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={regFormValue.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={regFormValue.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {regFormValue.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {regFormValue.isMember ? "Register" : "Login"}
          </button>
        </p>
        <p>
          {regFormValue.isMember ? "Forgot Passowrd?" : ""}
          <button type="button" className="member-btn">
            {regFormValue.isMember ? "Reset it" : ""}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
