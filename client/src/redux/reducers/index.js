import { combineReducers } from "redux";
import loggedIn from "./loggedInReducer";
import userData from "./userDataReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  loggedIn,
  userData,
  apiCallsInProgress,
});

export default rootReducer;
