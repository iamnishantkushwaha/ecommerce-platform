const { generatetoken } = require("./auth");
const User=require("../models/user")
const bcrypt=require("bcrypt")
async function handlesignup(req, res) {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    console.log(req.body);
    const user = await User.findOne( {email} );
    if (user) return res.status(400).json({ message: "User already Existed" });
    const hashpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashpassword,
      role
    });
    return res.status(201).json({message:`${role} created successfully`});
  } catch (error) {
    
  return res.status(500).json({ message: "Server Error", error });
  }
}

async function handlelogin(req, res) {
  const { email, password } = req.body;
  try {
     const user = await User.findOne({ email: email })
     console.log(user)
      if (!user) return res.status(404).json({ message: "User Not Found" });
        const matchpassword = await bcrypt.compare(password, user.password);
    console.log(matchpassword)
    if (!matchpassword) return res.status(401).json({ message: "incorrect password" });
    
    if(user.role==="VENDOR")
    {     if(!user.isApproved)  return res.status(401).json({message:"Not Approved Yet"});

    }
   
   
   
  

    const token =generatetoken(user);
    res.cookie("token",token);
    console.log("token:",token);
    return res.status(200).json({message:`login successfully`});
  } catch (err) {
    return res.status(500).json("Server Error");
  }
}

module.exports = { handlelogin, handlesignup };
