import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { checkRoutes } from "./routes";
import { logoutAction } from "./redux/actions/authActions";
import Spinner from "./components/Spinner";

function App(props) {
  console.log(props);
  const routes = checkRoutes(props.loggedIn);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(!!props.apiCallsInProgress);
  }, [props.apiCallsInProgress]);
  return (
    <div className="main">
      <header className="header">
        {props.loggedIn && (
          <button onClick={props.logoutAction} className="btn">
            Выйти
          </button>
        )}
      </header>
      {loading ? <Spinner /> : <Router>{routes}</Router>}
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
