const express = require("express");
const router = express.Router();

const { handlesignup, handlelogin } = require("../controllers/authentication");
router.post("/signup",handlesignup);

router.post("/login",handlelogin);

router.get("/",(req,res)=>{
    return res.send("hello");
})

module.exports=router;