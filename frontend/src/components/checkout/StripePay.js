import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../../utils/API";
import { setAlert } from "../../redux/actions/alertActions";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const StripePay = () => {
  const [nameOnCard, setNameOnCard] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.cartReducer);
  const description = "Purchase From <BLANK> Store";

  const onNameOnCard = (e) => {
    setNameOnCard(e.target.value);
  };

  const submitToken = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    try {
      const { token } = await stripe.createToken(cardElement);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = await submitToken();
    console.log(token);
    if (!token) {
      dispatch(setAlert("Payment cannot be submitted"));
      return;
    }
    try {
      const options = { headers: { "Content-Type": "application/json" } };
      const body = { token, total, nameOnCard, description };
      const url = "/stripe/singlecharge";
      let res = await API.post(url, body, options);
      console.log(res);
    } catch (error) {
      // dispatch(setAlert(error));
      console.log(error);
    }
  };

  return (
    <form className="stripe-pay" onSubmit={handleSubmit}>
      <div className="stripe-pay__title">checkout</div>
      <div className="stripe-pay__grid">
        <div className="stripe-pay__row">
          <input
            name="nameOnCard"
            className="stripe-pay__row-input"
            type="text"
            value={nameOnCard}
            onChange={(e) => onNameOnCard(e)}
            placeholder="Name"
            required
          />
        </div>
        <div className="stripe-pay__row">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4",
                    fontFamily: "sans-serif",
                  },
                },
                invalid: {
                  color: "#e9327c",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="stripe-pay__row stripe-pay__row-radio">
        <div className="radio radio--fill">use saved card</div>
        <div className="radio">save card</div>
      </div>
      <div className="stripe-pay__row">
        <button className="stripe-pay__button" disabled={!stripe}>
          Pay
        </button>
      </div>
    </form>
  );
};

export default StripePay;
