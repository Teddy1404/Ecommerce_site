const app = require("./app")
const dotenv = require("dotenv")

const connectTomongodb = require('./config/db')

//config
dotenv.config({path:"backend/config/config.env"});

//connnecting to database
connectTomongodb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on: ${process.env.PORT}`);
})