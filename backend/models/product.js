const mongoose=require("mongoose")




const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
         required:true
    },
  description:{
        type:String,
        
    },
    price:{
        type:String,
         required:true
    },
    image:{
        type:String,
         required:true
    },
    stock:{
        type:Number,
        
        required:true

    },
    category:{
        type:String,
        required:true
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    isFeatured:{type:Boolean,
        default:false}
},{timestamps:true});

const Product=mongoose.model("product",ProductSchema);
module.exports=Product;