const express = require("express");

const app = express();
const errorMiddleware = require("./middleware/error")
app.use(express.json())
//route import

const product = require("./routes/Productroute");
app.use("/api/v1",product);

//middleware for error
app.use(errorMiddleware);



module.exports = app;
