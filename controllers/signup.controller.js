const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

module.exports = {
  validationSignup: [
    check("firstName", "Введите имя").exists({ checkFalsy: true }),
    check("lastName", "Введите фамилию").exists({ checkFalsy: true }),
    check("email", "Некорректный email").isEmail(),
    check("password", "Введите пароль").exists({ checkFalsy: true }),
    check("password", "Длина пароля должна быть не менее 6 символов").isLength({
      min: 6,
    }),
  ],
  async signupController(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.errors,
          message: "Введены некорректные данные.",
        });
      }

      const { firstName, lastName, email, password, isAdmin } = req.body;

      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует." });
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin,
      });

      await user.save();
      return res
        .status(201)
        .json({ message: "Вы успешно зарегистрировались." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка на сервере. Попробуйте позднее." });
    }
  },
};
