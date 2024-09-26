const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");


//contact router
router.route("/contact").post(contactController.contactForm);



module.exports = router