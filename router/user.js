const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const authMiddelware = require("../middelware/authMiddelware");

//register
router.route("/register").post(userControllers.register);

//login
router.route("/login").post(userControllers.login);

//user
router.route("/user").get(authMiddelware,userControllers.userData)


module.exports = router;