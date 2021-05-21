const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    // Сплитим строчку headers.authorization по пробелу. 2й элемент массива - токен
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Вы не авторизованы. Войдите в систему." });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Вы не авторизованы. Войдите в систему." });
  }
};
