const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name connot exceed 30 charcaters"],
    minLength: [4, "Name should have then 4 charcters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter the a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater then 8 characters"],
    select: false,
  },
  gender: {
    type: String,
    required: [true, "please enter the marriage status"],
    enum: ["female", "male"],
    default: "male",
  },
  marriage_status: {
    type: String,
    required: [true, "please enter the marriage status"],
    enum: ["Unmarried", "Married"],
    default: "Unmarried",
  },
  marriage_date: {
    type:Date,
    required: [true, "please enter the marriage status"],
  },
  salary: {
    type: String,
    required: [true, "please enter the salary"],
  },
  country_id: {
    // type: mongoose.SchemaTypes.ObjectId,
    // ref: "Country",
    type: mongoose.ObjectId,
    ref: 'Country',
    required:true
  },
  state_id: {
    // type: mongoose.SchemaTypes.ObjectId,
    // ref: "State",
    type: mongoose.ObjectId,
    ref: 'State',
    required:true

  },
  hobbies: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "hobbies",

  },
  status: {
    type: String,
    required: [true, "please enter the active"],
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});
userShema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userShema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SCERET, {
    expiresIn: process.env.JWT_EXPIRE_IN_TIME,
  });
};

userShema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
module.exports = mongoose.model("Employee", userShema);
