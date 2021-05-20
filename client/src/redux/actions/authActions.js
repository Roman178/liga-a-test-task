import * as types from "./actionTypes";
import { login, logout, signup } from "../../api/auth.api";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";
import { checkToken } from "../../api/checkAuthorization";

function signupSuccess(data) {
  return { type: types.SIGNUP_SUCCESS, data };
}

function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

function logoutSuccess() {
  return { type: types.LOGOUT_OPTIMISTIC };
}

function checkAuthSuccess(userData) {
  return { type: types.CHECKAUTH_SUCCESS, userData };
}

export function checkAuthAction(token) {
  return async (dispatch) => {
    dispatch(beginApiCall());
    const userData = await checkToken(token);
    if (userData) {
      return dispatch(checkAuthSuccess(userData));
    } else {
      throw Error("Вы не автоизованы. Войдите в систему");
    }
  };
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
          // Массив errors создает биб-ка express-validator в случае если введенные данные не валидны.
          const errorsMsgs = data.errors.map((err) => err.msg);
          throw new Error(errorsMsgs.join(", "));
        } else {
          throw new Error(data.message); // Свои ошибки (напр. "Пользователь с таким email существует.")
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
      } else {
        if (data.errors) {
          // Массив errors создает биб-ка express-validator в случае если введенные данные не валидны.
          const errorsMsgs = data.errors.map((err) => err.msg);
          throw new Error(errorsMsgs.join(", "));
        } else {
          throw new Error(data.message); // Свои ошибки (напр. "Пользователь с таким email существует.")
        }
      }
    } catch (error) {
      dispatch(apiCallError());
      throw new Error(error.message);
    }
  };
}

export function logoutAction() {
  return (dispatch) => {
    logout();
    return dispatch(logoutSuccess());
  };
}
