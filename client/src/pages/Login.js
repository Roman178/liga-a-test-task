import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions/authActions";

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
    props.loginAction(form).then((data) => console.log(data));
  }

  return (
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
  );
};

const mapDispatchToProps = {
  loginAction,
};

export default connect(undefined, mapDispatchToProps)(Login);
