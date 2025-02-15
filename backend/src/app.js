const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.get("/user/getData", (req, res) => {
  try {
    throw new Error("error");
  } catch (err) {
    res.status(500).send("wrong");
  }

  //console.log("user details");
  //res.send("user data");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(7777, () => {
  console.log("server is connected to port 7777...");
});
