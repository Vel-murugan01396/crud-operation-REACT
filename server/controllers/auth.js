
const { User } = require("../models/User");

const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// REGISTER USER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // salt used for password encrption
    // const salt = await bcrypt.genSalt(); // bcrypt uses a 128-bit salt and encrypts a 192-bit magic value. It takes advantage of the fact that the Blowfish algorithm (used in the core of bcrypt for password hashing) needs a fairly expensive key setup, thus considerably slowing down dictionary-based attacks.
    // const passwordHash = await bcrypt.hash(password, salt); //The bcrypt hashing function allows us to build a password security platform that scales with computation power and always hashes every password with a salt.
    const token = jwt.sign({ name, email  }, 'your_secret_key', { expiresIn: '1h' });

    const newUser = new User({
      name,
      email,
      password,
      //  passwordHash,
    });


    

    const savedUser = await newUser.save();
   
   

    res.status(201).json({  savedUser,token });
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get method
const getregister = async (req, res) => {
  let details = await User.find();

   if (!details) return res.status(500).send("The details get is not added");
 

  res.send(details);
};



//deleted user for hole object
const deleteAllUsers = async (req, res) => {
 
    await User.deleteMany({}); // Delete all users

    res.status(200).json({ message: 'All users deleted successfully' });


};


// DELETE USER
const deleteUser = async (req, res) => {
  
    const userId = req.params.id; // Assuming you pass the user id as a route parameter

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await existingUser.deleteOne();

    res.status(200).json({ message: 'User deleted successfully' });

 
};




// UPDATE USER
const updateUser = async (req, res) => {
 

  try {
    // Check if the user exists
    const userId = req.params.id;


  
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    existingUser.name = req.body.name || existingUser.name;
    existingUser.email = req.body.email || existingUser.email;
    existingUser.password = req.body.password || existingUser.password;

    // Save the updated user
    const updatedUser = await existingUser.save();

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// LOGGIN USER

// AUTHENTICATION

const login =async (req,res)=>{
    try{
        const{email,password} =req.body;
        const user =await User.findOne({email:email});

        if(!user)
        return res.status(400).json({message:"user does not exist"});

        // const isMatch=await bcrypt.compare(password, user.password);
        // if (!isMatch)
        // return res.status(400).json({message:"invalid"});

        if (user.password !== password) {
          return res.status(400).json({ message: "Invalid password" });
        }
        //////
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:"1h"}); //JWT then uses the sign() method to create a JSON Web Token for that user and returns the token in the form of a JSON string.
        user.token=token;
        await user.save();
        // const token = generateToken(user._id);
    res.status(200).json({email,password, token });

    //
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};


const getLogin = async (req, res) => {
  let details = await User.find();

   if (!details) return res.status(500).send("The details get is not added");
 

  res.send(details);
};

module.exports = { register, getregister ,deleteAllUsers,deleteUser,updateUser,
login,getLogin
};

// module.exports={register,login};
