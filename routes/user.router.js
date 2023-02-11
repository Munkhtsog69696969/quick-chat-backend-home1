const express=require("express");

const userRouter=express.Router();

const { body, validationResult } = require('express-validator');

const {createNewUser}=require("../controller/user.controller");
const {loginUser}=require("../controller/user.controller");
const {authMiddleware}=require("../common/middleware/authMiddleware");
const {findFriends}=require("../controller/user.controller");

userRouter
    .post("/signup",
    body("email").isEmail(),
    body("password").isLength({min:6}),
    body("username").isLength({min:3}),
    createNewUser)

    .post("/login",loginUser,authMiddleware)

    .post("/findFriends",findFriends)

module.exports=userRouter;