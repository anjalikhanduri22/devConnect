const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("hello from the server");
});
app.use("/hello", (req, res) => {
  res.send("hello hello from the server");
});
app.use("/", (req, res) => {
  res.send("wellcome");
});

app.listen(7777, () => {
  console.log("server is connected to port 7777...");
});
