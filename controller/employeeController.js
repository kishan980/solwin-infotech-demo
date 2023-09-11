const employeeModel = require("../models/employee.model");
const ErrorHandle = require("../utils/ErrorHandler");
const asycnCatchError = require("../middleware/catchAsycnErrors");
const catchAsycnErrors = require("../middleware/catchAsycnErrors");
const sendToken = require("../utils/jwtToken");

exports.CreateEmployee = asycnCatchError(async (req, res, next) => {
  const {
    name,
    email,
    gender,
    password,
    marital_status,
    marriage_date,
    salary,
    country_id,
    state_id,
    hobbies,
    status,
  } = req.body;
  const addUser = await employeeModel.create({
    name,
    password,
    email,
    marital_status,
    marriage_date,
    salary,
    country_id,
    state_id,
    hobbies,
    status,
    gender,
  });
  const token = addUser.getJwtToken();
  return res
    .status(201)
    .json({ message: "Employee are created", addUser, token, success: true });
});

exports.loginUser = catchAsycnErrors(async (req, res, next) => {
  const { password, email } = req.body;
  //checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandle("please enter the email and password", 400));
  }

  const user = await employeeModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }
  console.log(isPasswordMatch);
  //   const token = user.getJwtToken();
  //   return res.status(200).json({
  //     success: true,
  //     token,
  //   });
  sendToken(user, 200, res);
});

exports.logout = catchAsycnErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "OffLine",
  });
});

exports.getAllEmployee = asycnCatchError(async (req, res, next) => {
  const allEmployee = await employeeModel
  // .find()
  // .populate("Country").populate("State")
  .find().select(" -id -__v")
  return res
    .status(201)
    .json({ message: "Get all employee", allEmployee, success: true });
});

exports.getByEmployee = asycnCatchError(async (req, res, next) => {
  const singleEmployeDetails = await employeeModel.findOne({
    _id: req.params.id,
  });
  if (!singleEmployeDetails) {
    return next(new ErrorHandle("not found employee details"));
  }
  return res
    .status(201)
    .json({ message: "Get all employee", singleEmployeDetails, success: true });
});

exports.deleteEmployee = asycnCatchError(async (req, res, next) => {
  const deleteEmployee = await employeeModel.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deleteEmployee) {
    return next(new ErrorHandle("not found employee id"));
  }
  return res
    .status(201)
    .json({ message: "Delete employee", success: true });
});

exports.updateEmployee = asycnCatchError(async (req, res, next) => {
  const updateDetailsEmployee = await employeeModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  return res
    .status(201)
    .json({
      message: "Employee are update",
      updateDetailsEmployee,
      success: true,
    });
});
