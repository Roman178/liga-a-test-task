import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { checkRoutes } from "./routes";
import { logoutAction } from "./redux/actions/authActions";
import Spinner from "./components/Spinner";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  console.log(props);
  const routes = checkRoutes(props.loggedIn);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(!!props.apiCallsInProgress);
  }, [props.apiCallsInProgress]);

  return (
    <div className="main">
      <Header loggedInFlag={props.loggedIn} handleClick={props.logoutAction} />
      {loading ? <Spinner /> : <Router>{routes}</Router>}
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    apiCallsInProgress: state.apiCallsInProgress,
  };
}

const mapDispatchToProps = {
  logoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
