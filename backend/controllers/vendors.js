const Product=require("../models/product");
const Order=require("../models/orders")
async function handleproductupload(req,res){
   const {title,description,price,stock,category}=req.body;
 console.log(req.file);
   try{  const isproductpresent= await Product.findOne({title,description,price});

  if(isproductpresent) return res.status(409).json({message:"product already present"})
   
    if(!isproductpresent)   
    await Product.create({
        title,
        description,
        price,
        image:req.file.path,
        stock,
        category,
        vendor:req.user._id
    })
      return res.status(201).json({message:"product added successfully"});
}
catch(err){
    return res.status(500).json({message:`Server error`,
        error:err.message
    });
} 

}




async function handleproduct(req,res){
    
    try{
    const product =await Product.find({vendor:req.user._id});
    
    if(!product) return res.status(404).json({message:"No product Found"});
    return res.status(200).json({message:"product found"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

async function handledelete(req,res){

    try{
    const product =await Product.findOneAndDelete({_id:req.params.id});
    if(!product) return res.status(404).json({message:"No product Found"});
      return res.status(200).json({message:"Deleted Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

async function handleproductupdate(req,res){
    try{
        const {title,description,price,image,stock,category}=req.body;
    const product =await Product.findOneAndUpdate({_id:req.params.id},{title,description,price,image,stock,category});
    if(!product) return res.status(404).json({message:"No product Found"});
     return res.status(200).json({message:"Updated Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

async function handleorders(req,res){
    try{
        
    const Orders =await Order.find({vendor:req.user._id});
    if(!Orders) return res.status(404).json({message:"No Order Found"});
     return res.status(200).json({message:"Order Fetched Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

async function handleorderstatus(req,res){
    try{
        const orderid=req.params.orderid;
        const {orderStatus,paymentStatus}=req.body;
    const Orders =await Order.findOneAndUpdate({_id:orderid},{orderStatus,paymentStatus});
    console.log(Orders)
    
    
    
    
    return res.status(200).json({message:"Order Fetched Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

module.exports={handleproduct,handleproductupload,handledelete,handleproductupdate,handleorders,handleorderstatus}