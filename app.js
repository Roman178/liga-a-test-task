const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const mongoose = require("mongoose");
const { authRouter } = require("./routes/auth.routes");
const { profileRouter } = require("./routes/profile.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Симуляция задержки ответа сервера
// app.use(function (req, res, next) {
//   setTimeout(next, 350);
// });

const PORT = config.get("port") || 5000;

app.use("/api/auth", authRouter);
app.use("/api", profileRouter);

mongoose
  .connect(config.get("mongoUri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server error ", err.message);
  });
