const { verifytoken } = require("../controllers/auth");
const Secret=process.env.Secret;


function protect(req,res,next){
    const token=req.cookie?.token;
    if(!token) return res.status(401).json({message:"unauthorized"})
    const payload=verifytoken(token,Secret)
    req.user=payload;
    next();
}

module.exports={protect}