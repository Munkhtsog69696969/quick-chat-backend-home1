const User=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const { body, validationResult } = require('express-validator');

require("dotenv").config();

const {tokenGenerator}=require("../common/tokenGenerator");

exports.createNewUser=async(req,res)=>{
    const errors = validationResult(req);

    const username=req.body.username;

    const email=req.body.email;

    const password=req.body.password;

    const existingUser=await User.findOne({email});

    if(existingUser && existingUser!==""){
        res.send("Email already in use.");
    }else{
        if(errors.isEmpty()){
            const salt=bcrypt.genSaltSync(10);

            const hash=bcrypt.hashSync(password , salt);

            const newUser=await User.create({username:username , email:email , password:hash});
    
            newUser.save();
    
            res.send("Created new user.");
        } else{
           if(errors.errors[0].param=="email"){
            res.send("Invalid email.");
           }
    
           if(errors.errors[0].param=="password"){
            res.send("Invalid password , password must be longer than 6 letters.");
           }
    
           if(errors.errors[0].param=="username"){
            res.send("Invalid username , username must be longer than 6 letters.");
           }
        }
    }
}


exports.loginUser=async(req,res,next)=>{
    const email=req.body.email;

    const password=req.body.password;

    const existingUser=await User.findOne({email});

    if(existingUser && existingUser!=""){
        const matched=await bcrypt.compareSync(password , existingUser.password);

        if(matched && matched){
            const accessToken=tokenGenerator({existingUser})

            if(accessToken && accessToken){
                // res.send({accessToken});
                req.headers.authorization=accessToken;
                next();
            }
        }else{
            res.send("Wrong username or password.");
        }
    }else{
        res.send("User doesnt exist.");
    }
}

exports.pushRoomId=async(req,res)=>{
    const userId=req.params.id;

    const roomId=req.body.roomId;

    const user=await User.findById(userId);

    user.rooms.push(roomId);

    user.save();

    res.send(user);
}

exports.showRoomId=async(req,res)=>{
    const userId=req.params.id;

    const user=await User.findById(userId).populate("rooms");

    res.send(user);
}