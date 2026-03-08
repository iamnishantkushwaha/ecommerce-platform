const multer=require("multer")
const path=require("path")
const express=require("express")
const cloudinary=require("../config/cloudinary")
const {CloudinaryStorage} =require("multer-storage-cloudinary")

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
       let folder="ecommerce-plateform"
       if(req.path.includes("add-product")) folder="products"

       return {
        folder:folder,
        allowed_formats:["jpg","jpeg","pdf","png"]
       };
       
    }
})
// const storage=multer.diskStorage({  if store locally
//     destination:(req,file,cb)=>{
//         return cb(null,path.resolve(`public/uploads/productphoto`))
//     },
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}-${file.originalname}`)
//     }
// })

const upload= multer({storage:storage});

module.exports=upload;