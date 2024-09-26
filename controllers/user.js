const User = require("../models/user");
const bcrypt = require("bcrypt");

// Register logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(401).json({ message: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashPassword,
    });

    // Generate JWT token and return response
    return res.status(200).json({
      message: `Registration successful for ${userCreated.username}`,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error from register logic", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

// Login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (isPasswordCorrect) {
      return res.status(200).json({
        message: `Login successful ${userExist.username}`,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error from login page", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

//user data 
const userData = async (req,res) => {
    try {
        const user = req.user;
        if(user){
            return res.status(200).json({message:"user data",user})
            
        }else{
            return res.status(401).json({message:"invalid user"})
        }
    } catch (error) {
        console.log("error from user data",error);
    }
}

module.exports = { register, login, userData };
