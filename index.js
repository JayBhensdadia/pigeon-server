const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5500;


//connect to db
const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("server is connected to db");
    } catch (error) {
        console.log("Server is NOT connected to db ",error.message);
    }
}

connectDb();

//default route
app.get("/",(req,res)=>{
    res.send("Hi there");
})



app.listen(PORT,()=>{
    console.log("server process running on port 5500");
})