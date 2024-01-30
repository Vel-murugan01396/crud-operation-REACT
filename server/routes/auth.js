// import express from "express";
// import { login } from "../controllers/auth";

const express =require("express");

const {register,  getregister,deleteAllUsers,deleteUser,updateUser,
    login,getLogin
} =require("../controllers/auth");

const { verifyToken } =require( "../middleware/auth");






const router =express.Router();




//register
router.post("/",register,verifyToken);
router.get("/",getregister,verifyToken);

router.delete("/alldelete",deleteAllUsers);
router.delete("/:id",deleteUser,verifyToken);

router.put("/:id",updateUser,verifyToken);

//login
router.post("/login",login,verifyToken);
router.get("/login",getLogin,verifyToken);


// export default router;
module.exports=router;