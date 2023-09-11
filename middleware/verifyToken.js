const jwt = require("jsonwebtoken");
const catchAsycnErrors = require("./catchAsycnErrors");
const userModel = require("../models/user.model");

exports.verifyToken =catchAsycnErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json("please login to access this resource",401)
    }
    const decodedData = jwt.verify(token,process.env.JWT_SCERET)
    req.user =await userModel.findOne({_id:decodedData.id})
    next()
})