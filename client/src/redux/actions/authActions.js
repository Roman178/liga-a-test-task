import * as types from "./actionTypes";
import { login, logout, signup } from "../../api/auth.api";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";

function signupSuccess(data) {
  return { type: types.SIGNUP_SUCCESS, data };
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
      if (data.ok) {
        return dispatch(signupSuccess(data));
      } else {
        if (data.errors) {
          const errorsMsgs = data.errors.map((err) => err.msg);
          throw new Error(errorsMsgs.join(", "));
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      dispatch(apiCallError());
      throw new Error(error.message);
    }
  };
}

export function loginAction(user) {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const data = await login(user);
      if (data.ok) {
        return dispatch(loginSuccess(data));
      }
      return data;
    } catch (error) {
      dispatch(apiCallError());
      console.error(`Ошибка при попытке входа в систему ${error}`);
    }
  };
}

export function logoutAction() {
  return (dispatch) => {
    logout();
    return dispatch(logoutSuccess());
  };
}
