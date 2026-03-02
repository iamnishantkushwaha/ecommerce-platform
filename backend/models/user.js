const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema({
    fullName:{
        type:String,
         required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
         unique:true
    },
    password:{
        type:String,
         required:true
    },
    role:{
        type:String,
        enum:["USER","VENDOR","ADMIN"],
        default:"USER",
        required:true

    },
    isApproved:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User=mongoose.model("user",UserSchema);
module.exports=User;