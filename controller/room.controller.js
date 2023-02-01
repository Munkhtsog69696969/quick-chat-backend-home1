const Room=require("../models/room.model");
const randomstring=require("randomstring");

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


exports.makeAdmin=async(req,res)=>{
    const roomId=req.params.id;

    const userId=req.body.userId;

    const room=await Room.findById(roomId);

    room.admins.push(userId);

    room.save();
}

exports.pushNewUser=async(req,res)=>{
    const roomCode=req.body.roomCode;

    const userId=req.body.userId;

    const room=await Room.findOne({code:roomCode});

    if(room && room!=""){
        room.users.push(userId);

        await room.save();

        res.send(room);
    }else{
        res.send("Room doesnt exist")
    }
}

exports.getRoomData=async(req,res)=>{
    const roomId=req.params.id;

    const room=await Room.findById(roomId);

    res.send(room);
}

exports.pushText=async(req,res)=>{
    const roomId=req.params.id;

    const text=req.body.text;

    const room=await Room.findById(roomId);

    room.texts.push(text);

    room.save();

    res.send(room);
}