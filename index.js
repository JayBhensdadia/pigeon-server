const express = require("express");
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5500;

//default route
app.get("/",(req,res)=>{
    res.send("Hi there");
})


app.listen(PORT,()=>{
    console.log("server process running on port 5500");
})