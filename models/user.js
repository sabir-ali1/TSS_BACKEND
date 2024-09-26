const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// JWT token generation method
userSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
          _id: this._id,
          email: this.email,
          isAdmin: this.isAdmin,
        },
        process.env.secret_key,
        { expiresIn: "5d" }
      );
    } catch (error) {
      console.error("Error from JWT token generation", error);
      throw new Error("Token generation failed");
    }
  };
  

const User = mongoose.model("User", userSchema);

module.exports = User;
