const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const authRouter = Router();

// signup
authRouter.post(
  "/signup",
  check("email", "Некорректный email").isEmail(),
  check("password", "Длина пароля должна быть не менее 6 символов").isLength({
    min: 6,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.errors,
          message: "Введены некорректные данные.",
        });
      }

      const { firstName, lastName, email, password, isAdmin } = req.body;
      console.log([firstName, lastName, email, password, isAdmin]);
      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует." });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      console.log(hashedPassword);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin,
      });
      console.log(user);
      await user.save();
      return res.status(201).json({ user, message: "Пользователь создан." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка на сервере. Попробуйте позднее." });
    }
  }
);

// login
authRouter.post(
  "/login",
  check("email", "Некорректный email").isEmail(),
  check("password", "Введите пароль").exists({ checkFalsy: true }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.errors,
          message: "Введены некорректные данные.",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Такого пользователя не существует." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль." });
      }

      const token = jwt.sign({ iserId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({
        token,
        userId: user.id,
        message: "Вы успешно вошли в систему.",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка на сервере. Попробуйте позднее." });
    }
  }
);

module.exports = {
  authRouter,
};
