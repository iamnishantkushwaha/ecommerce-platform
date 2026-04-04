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
    approvalStatus:{
        type:String,
        enum:["APPROVED","PENDING","REJECTED"],
        default:"PENDING"
    }
},{timestamps:true});

const User=mongoose.model("User",UserSchema);
module.exports=User;