const express = require("express");
const router = express.Router();
const protect =require("../middlewares/protect")
const { handlesignup, handlelogin } = require("../controllers/authentication");
const Product = require("../models/product");
router.post("/signup",handlesignup);

router.post("/login",handlelogin);

router.get("/logout",(req,res)=>{
     res.clearCookie("token");
    return res.status(200).json({message:"logout successfully"})
})

router.get("/products",async(req,res)=>{
  const {category,sort,maxprice,featured,minprice}=req.query;
  try{  const page=parseInt(req.query.page)||1;
 const limit=parseInt(req.query.limit)||10;
 const skip=(page-1)*limit;
console.log(req.query);
 let filter={};
     ///products?category=electronics&&sort=price&&minprice=333&&maxprice=8888 call like this
 if(category)
 {
  filter.category=category;
 }
   
if(featured){
  filter.isFeatured=true;
}
 const sortoption={createdAt:-1}
  if(sort==="price")
 {
  sortoption={price:1};
 }

 if(minprice || maxprice)
 {
   filter.price={}
   if(minprice) filter.price.$gte=Number(minprice);
   if(maxprice) filter.price.$lte=Number(maxprice);
 }
console.log("STATIC CONTROLLER");
const products=await Product.find(filter).sort(sortoption).skip(skip).limit(limit);

  console.log(products)
   const totalProducts = await Product.countDocuments(filter);
   
  
   if(!products|| products.length==0) return res.status(404).json({message:"products not available"})
   
 

return res.status(200).json({message:"product found",
    totalProducts,
    
      currentPage: page,
     
      totalPages: Math.ceil(totalProducts / limit),
      products})
 
  }catch(err){
    return res.status(500).json({message:"Server Error",
      error:err.message
    })
  }
 
})

router.get("/categories",async (req,res)=>{
  try{const categories=await Product.aggregate([{
   $group:{
    _id:"$category",
     totalproducts:{$sum:1}
   }
  }])
  if(!categories) return res.status(404).json({message:"no  category found"});
  return res.status(200).json({message:"category found", categories})}
  catch(err){
    return res.status(500).json({message:"server error",
      Error:err.message,
     
    })
  }
})


module.exports=router;