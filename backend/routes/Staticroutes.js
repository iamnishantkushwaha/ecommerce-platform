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
  const products=await Product.find({});
  console.log(products)
  if(!products|| products.length==0) return res.status(404).json({message:"products not available"})
   return res.status(200).json({message:"product found"})
})

module.exports=router;