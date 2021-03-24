import React from "react";
import CheckUser from "../../utils/CheckUser";
import HeaderCenter from "./HeaderCenter";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <>
      <CheckUser />
      <div className="header">
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </div>
    </>
  );
};

export default Header;
