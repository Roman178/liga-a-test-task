import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
// import initialState from "./redux/reducers/initialState";
import App from "./App";
import "./style/index.css";

const userData = JSON.parse(localStorage.getItem("userData"));
const initialState = userData
  ? { loggedIn: true, userData, apiCallsInProgress: 0 }
  : { loggedIn: false, userData: null, apiCallsInProgress: 0 };

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
