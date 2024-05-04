const express = require("express")
const app = express();
const db = require('../db')
require('dotenv').config();
const passport = require('../Auth')

const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser');


const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] : request made to ${req.originalUrl}`)
    next();
}

app.use(bodyParser.json()) 
app.use(logRequest)

app.use(passport.initialize());
const localAuthMiddileware  = passport.authenticate('local',{session: false});
app.get("/", (req,res)=>{
    res.send("welcome to my hotel!")
})

const personRoutes = require("./routes/personRoutes");
app.use("/person",localAuthMiddileware,personRoutes)


const menuRoutes = require("./routes/menuRoutes")
app.use("/menu",menuRoutes)


app.listen(PORT, ()=>{
    console.log("LISTNING ON PORT : " ,PORT)
});