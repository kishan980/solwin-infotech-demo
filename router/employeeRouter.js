const express =require("express");
const { CreateEmployee, loginUser, logout, getAllEmployee, getByEmployee, deleteEmployee, updateEmployee } = require("../controller/employeeController");
const router=express.Router();

router.route("/emp/add-employee").post(CreateEmployee)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/emp/all/").get(getAllEmployee)
router.route("/emp/:id").get(getByEmployee)
router.route("/emp/:id").delete(deleteEmployee)
router.route("/emp/:id").patch(updateEmployee)

module.exports =router