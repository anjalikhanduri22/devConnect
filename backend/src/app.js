const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("server is connected to port 7777...");
    });
  })
  .catch((err) => {
    console.error("unable to connect" + err.message);
  });
