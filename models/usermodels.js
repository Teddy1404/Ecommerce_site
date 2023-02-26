const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter Your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"please Enter your Email"],
        unique:true,
        validator:[validator.isEmail,"please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please Enter the password"],
        minLength:[8,"password should be greater than 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        } 
    },
    role:{
        type:String,
        default:"User",

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

module.exports = mongoose.model("User",userSchema);