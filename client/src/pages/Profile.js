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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGE0ZGM0ZTczNTg3YTNhNTAyZDc4ZjIiLCJpYXQiOjE2MjE0MjU5NjYsImV4cCI6MTYyMTQ4NTk2Nn0.ZiH6r2yGqn6f0VDoLAFymjPiVN9_GjMGJ7Q1bRyfkhE
