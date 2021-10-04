const mongoose=require("mongoose");
const validator = require('validator');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
        
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        
    },

})


//we need a collection
const User=mongoose.model("User",userSchema);

module.exports=User;