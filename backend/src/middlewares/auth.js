const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //find the token
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!!");
    }
    //validate the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    //find the user

    const user = await User.findById(_id);
    if (!user) {
      throw new error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = {
  userAuth,
};
