const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/usermodels");
const sendtoken = require("../utils/jwttoken")
//register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "Productfilepic",
    },
  });
 sendtoken(user,201,res);
});

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password ", 401));
  }
  sendtoken(user,200,res);
});
//logout user
exports.logout = catchAsyncError(async (req,res,next)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly:true,
  });
  res.status(200).json({
    success:true,
    message:"Logged Out",
  });
});