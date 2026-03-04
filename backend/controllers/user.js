const Product=require("../models/product")
const Order=require("../models/orders")

async function handleplaceorders(req,res){
    try{
        if(!req.user) return res.status(401).json({message:"unauthorized"})
    const {productId,quantity,deliveryAddress}=req.body;
    console.log(productId);
    const orderproduct=await Product.findById(productId);
    if(!orderproduct) return res.status(404).json({message:"product not found"});
    if(orderproduct.stock<quantity) return res.status(400).json({message:`in stock only ${orderproduct.stock} available`})
    
     orderproduct.stock-=quantity;   
    await Order.create({
        user:req.user._id,
        vendor:orderproduct.vendor,
        products:[{product:productId,productName:orderproduct.title,quantity,price:orderproduct.price}
        ],
        totalAmount:quantity*orderproduct.price,
        deliveryAddress
       
    });
     await Product.findByIdAndUpdate(productId,{stock:orderproduct.stock});
     return res.status(200).json({message:"Order Placed Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

async function handleorders(req,res){
    try{
        
    const Orders =await Order.find({user:req.user._id});
    if(!Orders) return res.status(404).json({message:"No Order Found"});
     return res.status(200).json({message:"Order Fetched Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

async function handlecancelorders(req,res){
    try{
        if(!req.user) return res.status(401).json({message:"unauthorized"})
         const cancelorderid=req.params.orderid;
        
         const CancelOrder= await Order.findByIdAndUpdate(cancelorderid,{orderStatus:"Cancelled"})
         const product=await Product.findById(CancelOrder.products[0].product,)
           product.stock+=CancelOrder.products[0].quantity;
           console.log(CancelOrder.products[0].quantity)
           await Product.findByIdAndUpdate(CancelOrder.products[0].product,{stock:product.stock})

     return res.status(200).json({message:"Order cancelled Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}
module.exports={handleplaceorders,handleorders,handlecancelorders}