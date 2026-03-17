const Product=require("../models/product")
const Order=require("../models/orders")
const Cart=require("../models/Cart")
const mongoose=require("mongoose")
const User=require("../models/user")
const bycrpt=require("bcrypt")
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
        return res.status(500).json({message:"Server Error",
          Error:err.message
        });
    }
}

async function handleorders(req,res){
    try{
         console.log("orders route hit");
    const Orders =await Order.find({user:req.user._id});
    if(Orders.length==0) return res.status(404).json({message:"No Order Found"
    });
     return res.status(200).json({message:"Order Fetched Successfully",orders:Orders})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

async function handlecancelorders(req,res){
    try{
        if(!req.user) return res.status(401).json({message:"unauthorized"})
         const cancelorderid=req.params.orderid;
        
         const CancelOrder= await Order.findByIdAndUpdate(cancelorderid,{orderStatus:"Cancelled"})
         if(!CancelOrder) return res.status(404).json({message:"order not found"})
         const product=await Product.findById(CancelOrder.products[0].product,)
           product.stock+=CancelOrder.products[0].quantity;
           console.log(CancelOrder.products[0].quantity)
           await Product.findByIdAndUpdate(CancelOrder.products[0].product,{stock:product.stock})

     return res.status(200).json({message:"Order cancelled Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}



    async function handlecart(req, res) {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    // If cart does not exist
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        products: [
          {
            product: productId,
            quantity: quantity
          }
        ]
      });

      return res.status(201).json({
        message: "Product added to cart",
        cart
      });
    }

    // Check if product already exists in cart
    const item = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (item) {
      return res.status(409).json({
        message: "Product already in cart"
      });
    }

    // Add new product
    cart.products.push({
      product: productId,
      quantity: quantity
    });

    await cart.save();

    return res.status(201).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}



async function handlegetcart(req,res){
    try{
        console.log(req.user);
        console.log(mongoose.modelNames());
     const cart=await Cart.findOne({user:req.user._id}).populate("products.product");
     
     
    if(!cart) return res.status(404).json({message:"cart is empty"})
       
        return res.status(200).json({message:" product is in cart"})
    }catch(error){
            console.log(error);   // ADD THIS

        return res.status(500).json({message:"server error"})
    }
    
}

async function handlecartupdate(req,res){
    try{
        const productId=req.params.productId;
        const {quantity}=req.body;
        const cart=await Cart.findOne({user:req.user._id})
        if(!cart) return res.status(404).json({message:"cart not found"})
        const item=cart.products.find((p)=>p.product.toString()===productId)  
      if(!item) return res.status(404).json({message:"product not found"})
         item.quantity=quantity;
         await cart.save();
        return res.status(200).json({message:"cart updated"}) }
        catch(err){
            return res.status(500).json({message:"server error"})
        }

}



async function handledeletecart(req,res){
    try{
        const productId=req.params.productId;
     const cart=await Cart.findOne({user:req.user._id});
     
     
    if(!cart) return res.status(404).json({message:"cart is empty"})
      cart.products=cart.products.filter((p)=>p.product.toString()!==productId)
     await cart.save() ;
        return res.status(200).json({message:"  product removed from cart"})
    }catch(error){
        return res.status(500).json({message:"server error"})
    }
    
}

async function handleprofile(req,res){
  
  try{
    const user=await User.findOne({_id:req.user._id})
    if(!user) return res.status(401).json({message:"unauthorized"})
    return res.status(200).json({message:"user found",user})
  }catch(err){
    return res.status(500).json({
      message:"Server error",
      Error:err.message

    })
  }
}
async function handleupdateprofile(req,res){
  try{
    const {fullName,email,phoneNumber}=req.body;
    const user=await User.findOneAndUpdate({_id:req.user._id},{fullName,email,phoneNumber});
    if(!user) return res.status(404).json({message:"user not found"})
    return res.status(200).json({message:"Profile Updated Successfully"})
  }catch(err){
return res.status(500).json({message:"Server Error",
  Error:err.message
 
})
}
}

async function handlepasswordchange(req,res){
  try{
   const {currentpassword,newpassword}=req.body;
    const user =await User.findOne({_id:req.user._id});
    if(!user) return res.status(404).json({message:"user not found"});
    const matchpassword=await   bycrpt.compare(currentpassword,user.password)
    if(!matchpassword) return res.status(401).json({message:"Incorrect password"});
    const hashpassword=await bycrpt.hash(newpassword,10);
    console.log(hashpassword)
    await User.findOneAndUpdate({_id:req.user._id},{password:hashpassword})
    return res.status(200).json({message:"Password Updated Successfully"});
  }catch(err){
 return res.status(500).json({message:"Server Error",
  Error:err.message
 })
  }
}
module.exports={handleplaceorders,handleprofile,handlepasswordchange,handleupdateprofile,handleorders,handlecancelorders,handlecart,handlegetcart,handlecartupdate,handledeletecart}