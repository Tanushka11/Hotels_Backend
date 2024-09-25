const express = require("express");
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddileware, generateToken } = require('../../jwt');


router.post("/signup", async (req,res)=>{
    try{
       const data = req.body; // coming from body-parser
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved")

    const payload = {
        id: response.id,
        username : response.username
    }
    const token = generateToken(payload);
    console.log("token is : ", token)
    res.status(200).json({response : response, token : token})
    }
    catch(err){
       res.status(404).json(console.log("error occured : ", err))
    }
   })

   // login route
   router.post("/login", async(req,res) => {
    try{
        // extract username and password from body
        const {username, password} = req.body;

        // find user by username
        const user = await Person.findOne({username: username});

        // if user do not exist or password do not match
        if(!user || !(await user.comparePassword(password)) ){
            return res.status(401).json({error : "Invalid userame or password"})
        }
        // generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
         // return token as response
          res.json({token})
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   })
   
   // profile route
   router.get("/profile",jwtAuthMiddileware, async(req,res,next) =>{
    try{
        const userdata = req.user
        const userId = userdata.id
       
        const user = await Person.findById(userId)
        
        res.status(200).json({user})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   })


   router.get("/",jwtAuthMiddileware, async (req,res)=>{
       try{
           const data = await Person.find();
           console.log("data fetched")
    res.status(500).json(data)
       }
       catch(err){
           res.status(404).json(console.log("error occured : ", err))
       }
       })

       router.get("/:workType",async (req,res)=>{
        try{
            const workType = req.params.workType;
            if(workType == "cheif"|| workType =="manager"|| workType =="owner"|| workType =="waiter"){
                const response = await Person.find({work : workType});
                console.log("data fetched");
                res.status(200).json(response);
    
            }else{
                res.status(500).json({err : "invalid work type"})
            }
        }
        catch(err){
            res.status(404).json({err: "error occured"})
        }
    })

    router.put("/:id" ,async (req,res) => {
        try{
            const prson_id = req.params.id;
            const updatedPersonData = req.body;

            const response = await Person.findByIdAndUpdate(prson_id,updatedPersonData, {
                new: true,
                runValidators: true
        })
        if(!response){
           return res.status(404).json({error : "person id not found"})
        }
        console.log("data updated")
        res.status(200).json(response);
       

        }catch(err){
            console.log(err);
            res.status(500).json("internal server error")
        }
    })

    router.delete("/:id",async (req,res) =>{
        try{
            const id = req.params.id;
            const response = await Person.findByIdAndDelete(id)
            if(!response){
            res.status(404).json({err: "id not found"})
            }
            console.log("person deleted");
            res.status(200).json("person deleted successfully");

        }catch(err){
            console.log(err);
            res.status(500).json("internal server error")
        }
    })

module.exports = router;