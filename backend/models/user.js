const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema({
    Fullname:{
        type:String,
         required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
         unique:true
    },
    Password:{
        type:String,
         required:true
    },
    Role:{
        type:String,
        enum:["USER","VENDOR","ADMIN"],
        default:"USER",
        required:true

    }
},{timestamps:true});

const User=mongoose.model("user",UserSchema);
module.exports=User;