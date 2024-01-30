const mongoose = require("mongoose");

const DasboardSchema =mongoose.Schema({
   

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
});

const Dasboard=mongoose.model("Dasboard",DasboardSchema);
// export default User;
module.exports = { Dasboard };