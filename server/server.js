const express = require("express")
const app = express();
const db = require('../db')
require('dotenv').config();
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser');

app.use(bodyParser.json()) 
const personRoutes = require("./routes/personRoutes");
app.use("/person",personRoutes)

app.get("/", (req,res)=>{
    res.send("welcome to my hotel!")
})

const menuRoutes = require("./routes/menuRoutes")
app.use("/menu",menuRoutes)


app.listen(PORT, ()=>{
    console.log("LISTNING ON PORT : " ,PORT)
});