const express=require("express");

const userRouter=express.Router();

const { body, validationResult } = require('express-validator');

const {createNewUser}=require("../controller/user.controller");
const {loginUser}=require("../controller/user.controller");
const {authMiddleware}=require("../common/middleware/authMiddleware");
const {pushRoomId}=require("../controller/user.controller");
const {showRoomId}=require("../controller/user.controller")

userRouter
    .post("/signup",
    body("email").isEmail(),
    body("password").isLength({min:6}),
    body("username").isLength({min:6}),
    createNewUser)

    .post("/login",loginUser,authMiddleware)

    .put("/pushRoomId/:id",pushRoomId)

    .get("/showRoomId/:id",showRoomId)

module.exports=userRouter;