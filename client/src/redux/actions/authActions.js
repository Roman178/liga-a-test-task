import * as types from "./actionTypes";
import { login, logout, signup } from "../../api/auth.api";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";

function signupSuccess() {
  return { type: types.SIGNUP_SUCCESS };
}

function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

function logoutSuccess() {
  return { type: types.LOGOUT_OPTIMISTIC };
}

export function signupAction(user) {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const data = await signup(user);
      if (data) {
        return dispatch(signupSuccess());
      } else {
        throw new Error("Ошибка при регистрации.");
      }
    } catch (error) {
      dispatch(apiCallError());
      console.error(error);
    }
  };
}

export function loginAction(user) {}

export function logoutAction() {
  return (dispatch) => {
    logout();
    return dispatch(logoutSuccess());
  };
}
