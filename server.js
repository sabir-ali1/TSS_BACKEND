require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const app = express();
const userRouter = require("./router/user");
const cors = require("cors");
const contactRouter = require("./router/contact");


app.use(express.json());

const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Credentials: true
}

app.use(cors(corsOption))


app.get("/",(req,res) => {
    res.status(200).json({message:"welcome to home page"})
});

//user router
app.use("/api/auth",userRouter);

//contact router
app.use("/api/auth",contactRouter);


const PORT = 5000

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
        })
})