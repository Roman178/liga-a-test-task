import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkToken } from "../api/checkAuthorization";
import { logoutAction } from "../redux/actions/authActions";

const Profile = (props) => {
  useEffect(() => {
    checkToken(props.token)
      .then((data) => {
        console.log(data);
        if (!data.ok) props.logoutAction();
      })
      .catch((err) => {
        console.log(err.message);
        console.error(err.message);
      });
  }, [props.token]);
  // console.log(props);
  return <h1>Profile Page</h1>;
};

function mapStateToProps(state) {
  return {
    token: state.userData.token,
  };
}

const mapDispatchToProps = {
  logoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
