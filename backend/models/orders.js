const mongoose=require("mongoose")


const OrderSchema=new mongoose.Schema({
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    product:[productid, productname,quantity,price],
    TotalAmount:{
        type:Number,
         required:true
    },
    OrderStatus:{
        type:String,
        enum:["Pending","Shipping","Delivered","Cancelled"],
        
        required:true,

    },
    paymentStatus:{
        type:String,
        enum:["paid","unpaid"]
    }
},{timestamps:true});

const Order=mongoose.model("order",OrderSchema);
module.exports=Order;