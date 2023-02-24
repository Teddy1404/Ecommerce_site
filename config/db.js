const mongoose = require("mongoose");



mongoose.set('strictQuery', true);
const connectToMongo = ()=>{
    mongoose.connect(process.env.mongoURI,(data)=>{
        console.log(`connected to mongo dbbbbbbbbbbb with host `);
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectToMongo;