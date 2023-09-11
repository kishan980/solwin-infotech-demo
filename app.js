const express = require("express");
const cookieParser =require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const app =express();
app.use(express.json())
app.use(cookieParser())

//router import
const employeeRouter =require("./router/employeeRouter")
const countryRouter =require("./router/countryRouter")
app.use("/api/v1",employeeRouter)
app.use("/api/v1",countryRouter)
app.use(errorMiddleware)

module.exports =app