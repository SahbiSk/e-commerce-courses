import React from "react";
import logo from "../../imgs/logo.svg";
import { withRouter } from "react-router-dom";

const HeaderLeft = (props) => {
  const navHome = () => {
    props.history.push("/");
  };

  return (
    <div className="header__left">
      <img
        className="header__left--image"
        onClick={navHome}
        src={logo}
        alt="logo"
      />
    </div>
  );
};

export default withRouter(HeaderLeft);
