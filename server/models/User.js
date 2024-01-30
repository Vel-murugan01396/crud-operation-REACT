// import mongoose from "mongoose";
 const mongoose=require("mongoose");
const UserSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            min: 5,
            max: 50,
        },
        email:{
            type:String,
            required:true,
            min: 5,
            max: 50,
        },
        password:{
            type:String,
            required:true,
            min: 5,
            max: 50,
        },
       
    },
    {timestamps:true}
);
const User=mongoose.model("User",UserSchema);
// export default User;
module.exports = { User };