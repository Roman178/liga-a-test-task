import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userDataReducer(state = initialState.userData, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;
    case types.LOGOUT_OPTIMISTIC:
      return null;
    default:
      return state;
  }
}
