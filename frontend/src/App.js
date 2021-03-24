import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Header from "./components/header/Header";
import Auth from "./pages/Auth";
import Footer from "./components/footer/Footer";
import Product from "./pages/Product";
import { Provider } from "react-redux";
import store from "./redux/store";
import Alert from "./components/alert/Alert";
import "./styles/main.css";
import ShoppingCart from "./pages/ShoppingCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51HvJbpF0joV4VlaSi2l2dsoS2U94gxuFov6mo7yMLtYrBAHqOgumex5tNjjyNNu3fZEAMRnKBupl4jAGPMljQuwW00c4XP2DvK"
  );

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="page-container">
          <Alert />
          <Elements stripe={stripePromise}>
            <Switch>
              <Route exact path="/auth">
                <Auth />
              </Route>
              <Route exact path="/product">
                <Product />
              </Route>{" "}
              <Route exact path="/cart">
                <ShoppingCart />
              </Route>
              <Route exact path="/">
                <Landing />
              </Route>
            </Switch>
          </Elements>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
