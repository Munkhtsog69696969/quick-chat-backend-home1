const express=require("express");

const roomRouter=express.Router();
const {createRoom}=require("../controller/room.controller");
const {makeAdmin}=require("../controller/room.controller")
const {pushNewUser}=require("../controller/room.controller")

roomRouter
    .post("/createRoom",createRoom)

    .put("/makeAdmin/:id",makeAdmin)

    .put("/pushNewUser/:id",pushNewUser)
module.exports=roomRouter;