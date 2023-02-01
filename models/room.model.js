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

    code:{
        type:String,
        required:true,
    },

    admins:[{type:Schema.Types.ObjectId , ref:"users"}],

    users:[{type:Schema.Types.ObjectId , ref:"users"}],

    texts:{
        type:Array,
    }
});



const Room=model("rooms",roomSchema);

module.exports=Room;