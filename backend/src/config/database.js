const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anjali:anjali@namaste-nodejs.dccdf.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
