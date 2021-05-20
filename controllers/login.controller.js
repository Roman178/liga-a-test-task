const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

module.exports = {
  validationLogin: [
    check("email", "Некорректный email").isEmail(),
    check("password", "Введите пароль").exists({ checkFalsy: true }),
  ],
  async loginController(req, res) {
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
      if (!user) {
        return res
          .status(400)
          .json({ message: "Такого пользователя не существует." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль." });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "5h",
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
  },
};
