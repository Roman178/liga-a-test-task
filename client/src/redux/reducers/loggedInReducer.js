import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loggedInReducer(state = initialState.loggedIn, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return true;
    case types.LOGOUT_OPTIMISTIC:
      return false;
    default:
      return state;
  }
}
