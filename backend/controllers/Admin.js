const User = require("../models/user");
async function handlemanagevendors(req,res){
 try{const vendors=await User.find({role:"VENDOR"});
 if(!vendors) return res.status(404).json({message:"vendors not available"});
 
 return res.status(200).json({message:"vendor fetched"})
}catch(err){
  return res.status(500).json({message:"server error"});
}


}
async function handleusers(req,res){
 try{const users=await User.find({role:"USER"});
 if(!users) return res.status(404).json({message:"users not available"});

 return res.status(200).json({message:"users fetched"})
}catch(err){
  return res.status(500).json({message:"server error"});
}


}


async function handlevendorapproval(req, res){
  const id = req.params.id;

  try {
    await User.findOneAndUpdate({ _id: id }, { isApproved: true });
    return res.status(200).json({ message: "Vendor Approved successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
}
async function handlevendorrejection(req, res){
  const id = req.params.id;

  try {
    await User.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Vendor Rejected successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
}
module.exports={handlemanagevendors,handleusers,handlevendorapproval,handlevendorrejection}