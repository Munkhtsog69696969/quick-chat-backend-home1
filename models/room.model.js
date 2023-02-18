const {Schema , Types , model}=require("mongoose");
const { object } = require("webidl-conversions");

const roomSchema=new Schema({
    code:{
        type:String,
        required:true,
    },

    roomId:{
        type:String,
        required:true,
    },

    admins:[{type:Schema.Types.ObjectId , ref:"users"}],

    users:[{type:Schema.Types.ObjectId , ref:"users"}],

    texts:[{
        type:Object,
    }],

});



const Room=model("rooms",roomSchema);

module.exports=Room;