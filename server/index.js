

const express=require("express");
const mongoose=require("mongoose");
const dontenv=require("dotenv");
const details=require("./routes/dasboard");
const cors=require("cors");
const { verifyToken } =require( "./middleware/auth");






const { register,getregister,deleteAllUsers,deleteUser,updateUser,
  login,getLogin
} = require("./controllers/auth");







dontenv.config();
const app = express();
app.use(express.json());
app.use(cors());



//signup and register
app.post("/register",register,verifyToken);

app.get("/register",getregister,verifyToken);
app.delete("/alldelete",deleteAllUsers,verifyToken);
app.delete("/register/:id",deleteUser,verifyToken);

app.put("/register/:id",updateUser,verifyToken);



// login
app.post("/login",login);
app.get("/login",getLogin);


//dasboard process
app.use("/details",details);





const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
   
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    console.log("db connected");
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });






