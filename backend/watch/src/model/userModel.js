const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide userName!"],
    minLength: 3,
    maxLength: 25,
  },
  email: {
    type: String,
    required: [true, "Please provide Email!"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Please provide valid Email!",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide password!"],
    minLength: 3,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, userName: this.userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME, });
};

UserSchema.methods.getName = function () {
  return `${this.userName} ${this.email}`;
}

UserSchema.methods.comparePass = async function (canditatePassword) {
  return await bcrypt.compare(canditatePassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);