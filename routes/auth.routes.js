const { Router } = require("express");
const {
  validationSignup,
  signupController,
} = require("../controllers/signup.controller");
const {
  validationLogin,
  loginController,
} = require("../controllers/login.controller");

const authRouter = Router();

// signup
authRouter.post("/signup", validationSignup, signupController);

// login
authRouter.post("/login", validationLogin, loginController);

module.exports = {
  authRouter,
};
