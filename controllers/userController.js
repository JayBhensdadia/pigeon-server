const express = require('express');
const UserModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../auth/generateToken');

//login controller
const loginController = asyncHandler( async (req,res)=>{
    const {name, password} = req.body;
    const user = await UserModel.findOne({name});
    const isPaswordMatching = user.matchPassword(password);
    if(user && isPaswordMatching){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(411).json({msg:"invalid username or password"});
        throw new Error("login attempt with invalid username or password");
    }
} );

//registration controller
const registerController = asyncHandler(async (req,res)=>{

    console.log("request is here");
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
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(500).json({msg:"unable to make entry in database"});
        throw new Error("unable to make entry in database");
    }

});


module.exports = {loginController, registerController};