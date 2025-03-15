const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email id" + value);
        }
      },
    },
    age: {
      type: Number,

      min: 18,
      max: 60,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(" please Enter a strong password" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default value",
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender is not valid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

(userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "anjali123", {
    expiresIn: "7d",
  });
  return token;
}),
  (userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
      passwordInputByUser,
      passwordHash
    );
    return isPasswordValid;
  });

module.exports = mongoose.model("User", userSchema);
