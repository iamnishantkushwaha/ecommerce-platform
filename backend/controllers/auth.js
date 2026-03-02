const jwt=require("jsonwebtoken")
const Secret=process.env.Secret
function generatetoken(user)
{
    const payload={
       Fullname: user.Fullname,
       Email:user.Email,
       PhoneNumber:user.PhoneNumber,
       Password:user.Password,
       Role:user.Role

    }
    return jwt.sign(payload,Secret);
}


function verifytoken(token){
    return jwt.verify(token,Secret);
}


module.exports={generatetoken,verifytoken}