const { generatetoken } = require("./auth");
const User=require("../models/user")
const bcrypt=require("bcrypt")
async function handlesignup(req, res) {
  try {
    const { Fullname, Email, PhoneNumber, Password, Role } = req.body;
    const user = await User.findOne({ Email });
    if (user) return res.status(400).json({ message: "User already Existed" });
    const hashpassword = await bcrypt.hash(Password, 10);

    await User.create({
      Fullname,
      Email,
      PhoneNumber,
      Password: hashpassword,
      Role,
    });
    return res.status(201).redirect("/");
  } catch (error) {
    return res.status(400).json({ message: "User already Existed" });
  }
}

async function handlelogin(req, res) {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email: Email });
   
    if (!user) res.status(404).json({ message: "User Not Found" }).redirect("/signup");
    const matchpassword = await bcrypt.compare(Password, user.Password);
   
    if (!matchpassword) return res.status(401).json({ message: "incorrect password" });

    const token =generatetoken(user);
    res.cookie("token",token);
    return res.status(200).redirect("/");
  } catch (err) {
    return res.status(500).json("Server Error");
  }
}

module.exports = { handlelogin, handlesignup };
