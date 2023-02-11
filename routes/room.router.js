const express=require("express");

const roomRouter=express.Router();

const {createRoom}=require("../controller/room.controller");

roomRouter
    .post("/createRoom",createRoom)

module.exports=roomRouter;