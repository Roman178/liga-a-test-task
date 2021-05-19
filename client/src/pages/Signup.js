import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup, login, logout } from "../api/auth.api";
import { signupAction } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      role: "user",
      isAdmin: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.sendReq = this.sendReq.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSelect(event) {
    this.setState({ role: event.target.value });
    this.setState({ isAdmin: event.target.value === "admin" ? true : false });
  }

  async sendReq() {
    if (this.state.password !== this.state.repeatPassword) {
      return toast.error("Пароли не совпадают.");
    }

    const { firstName, lastName, email, password, isAdmin } = this.state;
    try {
      const res = await this.props.signupAction({
        firstName,
        lastName,
        email,
        password,
        isAdmin,
      });
      console.log(res);
      if (res.data.ok) {
        toast.success(res.data.message);
        this.props.history.push("/login");
      }
    } catch (error) {
      console.error(error.message);
      error.message.split(", ").forEach((err) => toast.error(err));
      // toast.error(error.message);
    }

    // this.props
    //   .signupAction({ firstName, lastName, email, password, isAdmin })
    //   .then((data) => {
    //     console.log(data);
    //     if (data.ok) this.props.history.push("/login");
    //   })
    //   .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="page-title">Регистрация</h1>
        <form className="form">
          <label className="label">
            Имя
            <input
              className="input"
              name="firstName"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>

          <label className="label">
            Фамилия
            <input
              className="input"
              name="lastName"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>

          <label className="label">
            Email
            <input
              className="input"
              name="email"
              type="email"
              onChange={this.handleInputChange}
            />
          </label>

          <label className="label">
            Пароль
            <input
              className="input"
              name="password"
              type="password"
              onChange={this.handleInputChange}
            />
          </label>
          <label className="label">
            Повторите пароль
            <input
              className="input"
              name="repeatPassword"
              type="password"
              onChange={this.handleInputChange}
            />
          </label>
          <label className="label">
            Зарегестироваться как:
            <select
              className="input"
              value={this.state.role}
              onChange={this.handleSelect}
            >
              <option value="user">Пользователь</option>
              <option value="admin">Админ</option>
            </select>
          </label>
          <button onClick={this.sendReq} type="button" className="btn">
            Зарегистрироваться
          </button>
          <p className="form__paragraph">
            Уже зарегистрированы?
            <Link className="form__link" to="login">
              {" "}
              Войдите в систему
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signupAction,
};

export default connect(undefined, mapDispatchToProps)(withRouter(Signup));
