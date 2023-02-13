const Room=require("../models/room.model");
const randomstring=require("randomstring");
const io = require('socket.io')

exports.createRoom=async(req,res)=>{
    const name=req.body.name;

    const isPrivite=req.body.isPrivite;

    let code=randomstring.generate(8);

    let existingCode=true;

    while(existingCode==true){
        const existingRoom=await Room.find({code});

        if(existingRoom && existingRoom==""){
            existingCode==false;
            break;
        }
    }

    const newRoom=await (await Room.create({name:name , isPrivite:isPrivite , code:code})).save();

    res.send(newRoom);
}