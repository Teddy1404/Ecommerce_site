const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const errorMiddleware = require("./middleware/error")
app.use(express.json())
app.use(cookieParser());
//route import

const product = require("./routes/Productroute");
const user = require("./routes/userroutes")
app.use("/api/v1",product);
app.use("/api/v1",user);

//middleware for error
app.use(errorMiddleware);



module.exports = app;
