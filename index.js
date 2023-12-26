const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5500;


app.use(express.json());


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

//routes
app.use('/user/',userRoutes);

app.get('/',(req,res)=>{
    res.send("hi there");
})

app.listen(PORT,()=>{
    console.log("server process running on port 5500");
})