const Room=require("../models/room.model");

exports.createRoom=async(req,res)=>{
    const name=req.body.name;

    const isPrivite=req.body.isPrivite;

    const newRoom=await (await Room.create({name:name , isPrivite:isPrivite})).save();

    res.send(newRoom);
}

exports.makeAdmin=async(req,res)=>{
    const roomId=req.params.id;

    const userId=req.body.userId;

    const room=await Room.findById(roomId);

    room.admins.push(userId);

    room.save();
}