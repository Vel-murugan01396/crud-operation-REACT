const express =require("express");
const router =express.Router();
const {Dasboard} =require("../models/Dasboard");

router.post("/", async (req,res)=>{
    let details=new Dasboard({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        
        
    });

   details = await details.save();

    if (!details) return res.status(500).send("The details is not added");
    res.status(200);
  
    res.send(details);
    res.end()

});


router.put("/:id", async(req, res) =>{
    let details =await Dasboard.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        },
        {new:true}
    );

    //console.log(order);
    if(!details) return res.status(500).send("The details put is not added");
    res.send(details);
});

router.get('/',  async(req,res)=>{
    let details = await Dasboard.find()

    if(!details) 
    return res.status(500).send('The details get is not added')
    //console.log(blogs)

    res.send(details);

    });


    router.delete('/:id',async(req,res)=>{
        let details = await Dasboard.findByIdAndDelete(req.params.id);
           if(!details) 
           return res.status(500).send('The details delete is deleted')
        res.send(details)
           });









module.exports=router;