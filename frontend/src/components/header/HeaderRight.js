import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import HeaderLogin from "./HeaderLogin";
import HeaderMenu from "./HeaderMenu";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const HeaderRight = (props) => {
  const { clearance } = useSelector((state) => state.userReducer.user);
  const goToCart = () => {
    props.history.push("/cart");
  };
  return (
    <div className="header__right">
      <AiOutlineShoppingCart
        onClick={() => goToCart()}
        className="header__right--cart"
      />
      {clearance ? <HeaderMenu /> : <HeaderLogin />}
    </div>
  );
};

export default withRouter(HeaderRight);
