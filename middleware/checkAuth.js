const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Сплитим строчку по пробелу. 2й элемент массива - токен
    if (!token) {
      return res
        .status(401)
        .json({ message: "Вы не авторизованы. Войдите в систему." });
    }
    console.log(token);
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Вы не авторизованы. Войдите в систему." });
  }
};
