const { verifytoken } = require("../controllers/auth");
const Secret=process.env.Secret;


function protect(req,res,next){
    const token=req.cookies?.token;
    console.log(token);
    if(!token) return res.status(401).json({message:"unauthorized"})
    try{
     const payload=verifytoken(token,Secret)
     if(!payload) return res.status(401).json({message:"invalid token"})
    req.user=payload;
    next();}catch(err){
        return res.status(500).json({message:"token validation failed"})
    }
}

module.exports={protect}