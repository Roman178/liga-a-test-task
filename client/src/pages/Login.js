import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions/authActions";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Login = (props) => {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function sendReq() {
    props
      .loginAction(form)
      .then((res) => {
        if (res.user.ok) {
          return toast.success(res.user.message);
        }
      })
      .catch((err) => {
        console.error(err.message);
        err.message.split(", ").forEach((err) => toast.error(err));
      })
      .finally(() => setForm({ email: "", password: "" }));
  }

  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : (
        <div className="wrapper">
          <h1 className="page-title">Войти</h1>
          <form className="form form_login">
            <label className="label">
              Email
              <input
                className="input"
                name="email"
                type="email"
                onChange={handleInputChange}
              />
            </label>

            <label className="label">
              Пароль
              <input
                className="input"
                name="password"
                type="password"
                onChange={handleInputChange}
              />
            </label>
            <button onClick={sendReq} type="button" className="btn">
              Войти
            </button>
          </form>
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
