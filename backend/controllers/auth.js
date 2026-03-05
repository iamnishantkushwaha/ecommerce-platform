const jwt=require("jsonwebtoken")
const Secret=process.env.Secret
function generatetoken(user)
{
    const payload={
        _id:user._id,
       role:user.role

    }
 
    return jwt.sign(payload,Secret);
}


function verifytoken(token){
          
         return jwt.verify(token,Secret);
  
    
}


module.exports={generatetoken,verifytoken}