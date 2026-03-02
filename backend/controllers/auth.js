const jwt=require("jsonwebtoken")
const Secret=process.env.Secret
function generatetoken(user)
{
    const payload={
       fullName: user.fullName,
       email:user.email,
       phoneNumber:user.phoneNumber,
       password:user.password,
       role:user.role

    }
    return jwt.sign(payload,Secret);
}


function verifytoken(token){
    return jwt.verify(token,Secret);
}


module.exports={generatetoken,verifytoken}