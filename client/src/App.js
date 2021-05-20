import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { checkRoutes } from "./routes";
import { logoutAction } from "./redux/actions/authActions";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  console.log(props);
  const routes = checkRoutes(props.loggedIn);

  return (
    <div className="main">
      <Header loggedInFlag={props.loggedIn} handleClick={props.logoutAction} />
      <Router>{routes}</Router>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
  };
}

const mapDispatchToProps = {
  logoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
