const express = require("express");
const router = express.Router();
const Person = require('../models/person');

router.post("/", async (req,res)=>{
    try{
       const data = req.body; // coming from body-parser
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved")
    res.status(500).json(response)
    }
    catch(err){
       res.status(404).json(console.log("error occured : ", err))
    }
   })
   
   router.get("/", async (req,res)=>{
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