const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncError");
const User = require("../models/usermodels");
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("please login to access this ", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

// authorised Roles
exports.authorizeRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req,res,roles)){
            return next(
                new ErrorHandler(
                    `Role: ${req.user.roles} is not allowed to acces this resource`,403
                )
            );
        }
        next();
    }
}