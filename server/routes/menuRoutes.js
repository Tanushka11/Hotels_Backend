const express = require("express")
const router = express.Router();
const Menu = require("../models/menu")

router.post("/",async (req,res)=>{
    try{

    const menu = req.body;
    const MenuList = new Menu(menu)
    const response = await MenuList.save();
    console.log("data saved")
    res.status(500).json(response)

    }catch(err){
    res.status(404).json(console.log("error occured : ", err))
    }
 })


 router.get("/",async (req,res)=>{
try{
    const menu = await Menu.find();
    res.status(500).json({
        menu
    })
}catch(err){
    res.status(404).json(err)
}

})

router.get("/:taste", async (req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == "sweet" || taste == "spicy" || taste == "sour")
        {
           
    const response = await Menu.find({taste : taste})
    console.log("taste found")
    res.status(200).send(response)
}
else{
    res.status(500).json("taste not found")
}
    }
    catch(err){
        console.log(err)
        res.status(404).json({err : "internal server error"})
    }
})

router.get("/dish/:name", async (req,res)=>{
    try{
        const name = req.params.name;    
    const response = await Menu.find({name})
    console.log("dish found")
    res.status(200).send(response)
}
    catch(err){
        console.log(err)
        res.status(404).json({err : "internal server error"})
    }
})

router.put("/:id", async (req,res) =>{
    try{
        const id = req.params.id;
        const updatedName = req.body;
        const response = await Menu.findByIdAndUpdate(id,updatedName,{
            new: true,
            runValidators: true
        })
        if(!response){
            res.status(404).json("id not found");
        }
        console.log("name is updated");
        res.status(200).json(response);
    }catch(error){
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
})

router.delete("/:id", async(req,res) => {
   try{
    const id = req.params.id;
    const response =await Menu.findByIdAndDelete(id);
    if(!response){
        res.status(404).json("id not found");
    }
    console.log("menu item is deleted");
        res.status(200).json("deleted successfully");
   }catch(error){
    console.log(error)
    res.status(500).json({error: "internal server error"})
}
})


module.exports = router;