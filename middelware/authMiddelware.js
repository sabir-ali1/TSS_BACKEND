const jwt = require("jsonwebtoken");
const User = require("../models/user")

const authMiddelware = async (req,res,next) => {
    try {
        const token = req.header("Authorization");
        if(!token){
            return res.status(401).json({message:"invalid token"})
        }

        const jwtToken = token.replace("Bearer","").trim();

        const isVerifyied = jwt.verify(jwtToken,process.env.secret_key);
        const userData = await User.findOne({email:isVerifyied.email}).select({password:0});
      
    
        req.user = userData;

        next();

    } catch (error) {
        console.log("error from jwt auth middelware",error);
    }
}

module.exports = authMiddelware