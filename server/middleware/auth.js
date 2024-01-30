// // import  jwt from "jsonwebtoken";
const jwt =require("jsonwebtoken")


 const verifyToken=async(req,res,next) =>{
   try{
    let token =req.header("authorization");

    if(!token){
        return res.status(403).send({message: "No token provided!"});
    }

    const verified =jwt.verify(token, process.env.JWT_SECRET);
    req.user=verified;
    next();
    

   } 
   catch(error){
    res.status(500).json({error:error.message});
   }
};

module.exports={verifyToken};