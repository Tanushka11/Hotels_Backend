const mongoose = require("mongoose")
//mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotels'
//set up mongodb connection
mongoose.connect(mongoURL);
//mongoose maintains the default connection object which represents mongodb connections
const db = mongoose.connection;

// event listner
db.on("connected", ()=>{
    console.log("connected to mongodb")
})
db.on("error", (err)=>{
    console.error("error occured", err)
})
db.on("disconnected", (err)=>{
    console.error("disconnected", err)
})

module.exports= db