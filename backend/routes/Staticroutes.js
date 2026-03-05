const express = require("express");
const router = express.Router();

const { handlesignup, handlelogin } = require("../controllers/authentication");
const Product = require("../models/product");
router.post("/signup",handlesignup);

router.post("/login",handlelogin);

router.get("/logout",(req,res)=>{
     res.clearCookie("token");
    return res.status(200).json({message:"logout successfully"})
})

router.get("/products",async(req,res)=>{
  try{

 const page=parseInt(req.query.page)||1;
 const limit=parseInt(req.query.limit)||10;
 const skip=(page-1)*limit;


  const products=await Product.find().sort({createdAt:-1}).skip(skip).limit(limit);
  console.log(products)
   const totalProducts = await Product.countDocuments();

  if(!products|| products.length==0) return res.status(404).json({message:"products not available"})
   return res.status(200).json({message:"product found",
    totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products})
  }catch(err){
    return res.status(500).json({message:"Server Error"})
  }
 
})


module.exports=router;