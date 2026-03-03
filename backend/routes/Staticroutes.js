const express = require("express");
const router = express.Router();

const { handlesignup, handlelogin } = require("../controllers/authentication");
router.post("/signup",handlesignup);

router.post("/login",handlelogin);

router.get("/logout",(req,res)=>{
     res.clearCookie("token");
    return res.status(200).json({message:"logout successfully"})
})

module.exports=router;