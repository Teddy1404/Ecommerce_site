const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/usermodels");
const sendtoken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
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

//forgot password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
const user = await User.findOne({email: req.body.email});
if(!user){
  return next(new ErrorHandler("user not found",404));
}
// get reset password token
const resetToken = user.getResetPasswordToken();
await user.save({validateBeforeSave: false});

const resetPasswordUrl = `${req.protocol}://${req.get("host")}  /api/v1/passowrd/reset/${resetToken}`;
const message = `Your password rest token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;
try {
  await sendEmail({
email: user.email,
subject:`Ecommerse Password Recovery`,
message,
  });
  res.status(200).json({
    success:true,
    message:`Email sent to ${user.email} successfully`,
  })
} catch (error) {
  user.resetPasswordToken = undefined;
  user.resetPasswordToken = undefined;
  await user.save({validateBeforeSave: false});
  return next(new ErrorHandler(error.message,500));
}
});

// reset password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
  //creating token hash
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


})