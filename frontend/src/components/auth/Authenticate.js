import React, { useState } from "react";
import logo from "../../imgs/logo.svg";
import { signupAction, loginAction } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/alertActions";

const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitVal, setSubmitVal] = useState("Login");
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      return dispatch(setAlert("Passwords must be 8 characters or more"));
    }
    submitVal === "Login"
      ? dispatch(loginAction(email, password))
      : dispatch(signupAction(email, password));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const optionsClick = (e) => {
    setSubmitVal(e.target.id);
  };
  //classes
  let loginClass =
    submitVal === "Login"
      ? "auth__options--login auth__options--clicked"
      : "auth__options--login";

  let signupClass =
    submitVal === "Signup"
      ? "auth__options--login auth__options--clicked"
      : "auth__options--login";
  return (
    <div>
      <div className="auth__container">
        <div className="auth__options">
          <div
            className={loginClass}
            id="Login"
            onClick={(e) => optionsClick(e)}
          >
            Login
          </div>
          <div
            className={signupClass}
            id="Signup"
            onClick={(e) => optionsClick(e)}
          >
            Signup
          </div>
        </div>
        <div className="auth">
          <img className="auth__header" src={logo} alt="logo" />
          <form className="auth__form" onSubmit={(e) => submit(e)}>
            <input
              value={email}
              className="auth__form--input"
              type="email"
              placeholder="email"
              onChange={(e) => updateEmail(e)}
            />
            <input
              value={password}
              className="auth__form--input"
              type="password"
              placeholder="password"
              onChange={(e) => updatePassword(e)}
            />
            <input
              className="auth__form--submit"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
