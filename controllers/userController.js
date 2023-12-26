const express = require('express');
const UserModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');


const loginController = ()=>{};

const registerController = asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body;

    //check for all fields
    if(!name || !email || !password){
        res.sendStatus(400);
        throw new Error("incomplete inputs!!!");
    }

    //is user already exists
    const userExist = await UserModel.findOne({email});
    if(userExist){
        res.status(400).json({msg:"user already exist"});
        throw new Error("user already exists");
    }

    //if username is taken
    const usernameExist = await UserModel.findOne({name});
    if(usernameExist){
        res.status(400).json({msg:"username is taken"});
        throw new Error("username has taken");
    }

    //create an entry to database
    const user = await UserModel.create({name, email, password});
    if(user){
        res.json("user entery added to database");
    }else{
        res.status(500).json({msg:"unable to make database entry"});
    }

});


module.exports = {loginController, registerController};