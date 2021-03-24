import { GET_USER, LOGOUT, CHECK_USER_FAIL } from "../types";
import API from "../../utils/API";
import { setAlert } from "./alertActions";

const options = {
  headers: { "Content-Type": "application/json" },
};

export const signupAction = (email, password) => async (dispatch) => {
  const body = { email, password };

  const url = "/auth/signup";
  try {
    const res = await API.post(url, body, options);
    dispatch({ type: GET_USER, payload: res.data.user });
    console.log(res.data.user);
  } catch (error) {
    dispatch(setAlert(error.response.data.message));
  }
};

export const loginAction = (email, password) => async (dispatch) => {
  const body = { email, password };

  const url = "/auth/login";
  try {
    const res = await API.post(url, body, options);
    dispatch({ type: GET_USER, payload: res.data.user });
    console.log(res.data.user);
  } catch (error) {
    dispatch(setAlert(error.response.data.message));
  }
};

export const logoutAction = (email, password) => async (dispatch) => {
  const body = { email, password };

  const url = "/auth/logout";
  try {
    await API.get(url, body, options);
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch(setAlert(error.response.data.message));
  }
};

export const checkUserAction = () => async (dispatch) => {
  const url = "/auth/checkuser";
  try {
    let res = await API.get(url);
    dispatch({ type: GET_USER, payload: res.data.user });
  } catch (err) {
    dispatch({ type: CHECK_USER_FAIL });
  }
};
