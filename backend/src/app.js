const express = require("express");

const app = express();

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send("hello from the server");
});

app.listen(7777, () => {
  console.log("server is connected to port 7777...");
});
