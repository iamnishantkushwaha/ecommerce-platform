const multer=require("multer")
const path=require("path")
const express=require("express")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,path.resolve(`public/uploads/productphoto`))
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload= multer({storage:storage});

module.exports=upload;