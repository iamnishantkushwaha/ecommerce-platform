


function rolecheck(role)
{
    return function (req,res,next){

         if(!req.user)
        {
           return  res.status(404).json({message:"Not Found"});
        }
        
        if(req.user.role!==role)
        {
           return  res.status(401).json({message:"unauthorized"})
            
        }
   
        next();    };
}

module.exports={rolecheck}