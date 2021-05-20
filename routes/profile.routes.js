const { Router } = require("express");
const config = require("config");
const User = require("../models/User");
const checkAuth = require("../middleware/checkAuth");
const profileRouter = Router();

profileRouter.get("/profile", checkAuth, async (req, res) => {
  try {
    const userData = await User.findById(req.user.userId);

    if (userData) {
      const { email, firstName, lastName, isAdmin } = userData;
      return res.json({ email, firstName, lastName, isAdmin });
    } else {
      return res.status(401).json({ message: "Войдите в систему." });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка на сервере." });
  }
});

module.exports = {
  profileRouter,
};
