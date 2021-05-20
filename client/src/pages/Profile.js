import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { checkToken } from "../api/checkAuthorization";
import { logoutAction, checkAuthAction } from "../redux/actions/authActions";
import adminImg from "../images/admin-img.png";
import userImg from "../images/user-img.png";
import Spinner from "../components/Spinner";

const Profile = (props) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    props
      .checkAuthAction(props.token)
      .then((data) => {
        console.log(data);
        if (!data.userData.ok) {
          props.logoutAction();
        }
        setUserData(data.userData);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  console.log(userData);
  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Личный кабинет</h1>
          <div>
            <h2>Ваши данные</h2>
            <ul>
              <li>
                <span>Имя: {userData.firstName}</span>
              </li>
              <li>Фамилия: {userData.lastName}</li>
              <li>Email: {userData.email}</li>
            </ul>
          </div>
          {userData.isAdmin ? (
            <div className="img-wrapper">
              <img
                className="img-wrapper__img"
                src={adminImg}
                alt="Картинка админа"
              />
            </div>
          ) : (
            <div className="img-wrapper">
              <img
                className="img-wrapper__img"
                src={userImg}
                alt="Картинка пользователя"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    token: state.userData.token,
    loggedIn: state.loggedIn,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  logoutAction,
  checkAuthAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
