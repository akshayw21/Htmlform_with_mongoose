const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true
        
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },

})


//we need a collection
const User=mongoose.model("User",userSchema);

module.exports=User;