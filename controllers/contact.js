const Contact = require("../models/contact");

//contact 
const contactForm = async (req,res) => {
    try {
        const {username,email,message} = req.body;

        const contact = await Contact.create({username,email,message});

        return res.status(201).json({message:"Message send Successfull",contact})

    } catch (error) {
        console.log("error from message",error);
    }
}

module.exports = {contactForm}