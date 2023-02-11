const User=require("../models/user.model");

const bcrypt=require("bcrypt");

const { body, validationResult } = require('express-validator');

const randomstring=require("randomstring")

require("dotenv").config();

const {tokenGenerator}=require("../common/tokenGenerator");

exports.createNewUser=async(req,res)=>{
    const errors = validationResult(req);

    const username=req.body.username;

    const email=req.body.email;

    const password=req.body.password;

    const avatarImageUrl=req.body.avatarImageUrl;

    const existingUser=await User.findOne({email});



    let code=randomstring.generate(10);

    let existingCode=await User.find({usercode:code});

    while(existingCode && existingCode!==""){
        code=randomstring.generate(10);

        existingCode=await User.find({usercode:code});

        if(existingCode && existingCode==""){
            break;
        }
    }

    if(existingUser && existingUser!==""){
        res.send("Email already in use.");
    }else{
        if(errors.isEmpty()){
            const salt=bcrypt.genSaltSync(10);

            const hash=bcrypt.hashSync(password , salt);

            const newUser=await User.create({username:username , email:email , password:hash , avatarImageUrl:avatarImageUrl , usercode:code});
    
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


exports.findFriends=async(req,res)=>{
    const userCode=req.body.usercode;

    const user=await User.find({usercode:userCode});

    const userToken=tokenGenerator({user})

    res.send(userToken)
}

exports.findFriendsUsername=async(req,res)=>{
    const username=req.body.name;

    const user=await User.find({username:username});

    const userToken=tokenGenerator({user});

    res.send(userToken);
}
