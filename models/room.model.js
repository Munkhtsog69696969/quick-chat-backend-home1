const {Schema , Types , model}=require("mongoose");

const roomSchema=new Schema({
    name:{
        type:String,
        required:true,
    },

    isPrivite:{
        type:Boolean,
        required:true,
    },

    admins:[{type:Schema.Types.ObjectId , ref:"users"}],
});



const Room=model("rooms",roomSchema);

module.exports=Room;