const express=require("express");

const roomRouter=express.Router();
const {createRoom}=require("../controller/room.controller");
const {makeAdmin}=require("../controller/room.controller")

roomRouter
    .post("/createRoom",createRoom)

    .put("/makeAdmin/:id",makeAdmin);
module.exports=roomRouter;