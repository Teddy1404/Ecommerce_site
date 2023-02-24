const ErrorHandler = require("../utils/errorhandler")
module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Interal server error";

    res.status(err.statuscode).json({
        success:false,
        error:err,
    })
}