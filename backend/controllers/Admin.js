const User = require("../models/user");
const Order = require("../models/orders");
const Product = require("../models/product");
async function handlemanagevendors(req, res) {
  try {
    const vendors = await User.find({ role: "VENDOR" });
    if (!vendors)
      return res.status(404).json({ message: "vendors not available" });

    return res.status(200).json({ message: "vendor fetched" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
}
async function handleusers(req, res) {
  try {
    const users = await User.find({ role: "USER" });
    if (!users) return res.status(404).json({ message: "users not available" });

    return res.status(200).json({ message: "users fetched" ,users});
  } catch (err) {
    return res.status(500).json({ message: "server error",
      Error:err.message
     });
  }
}

async function handledeleteuser(req,res){
  try {
    const userId=req.params.id;
    const users = await User.findByIdAndDelete(userId);
    if (!users) return res.status(404).json({ message: "User not Found" });

    return res.status(200).json({ message: "User Deleted Successfully"});
  } catch (err) {
    return res.status(500).json({ message: "server error",
      Error:err.message
     });
  }
}

async function handlevendorapproval(req, res) {
  const id = req.params.id;

  try {
    await User.findOneAndUpdate({ _id: id }, { isApproved: true });
    return res.status(200).json({ message: "Vendor Approved successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
}
async function handlevendorrejection(req, res) {
  const id = req.params.id;

  try {
    await User.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Vendor Rejected successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
}

async function handledashboard(req, res) {
  try {
    const totalvendors = await User.countDocuments({ role: "VENDOR" });
    const totalusers = await User.countDocuments({ role: "USER" });
    const totalorders = await Order.countDocuments();
    const totalproducts = await Product.countDocuments();
    return res
      .status(200)
      .json({
        message: "dasshboard stats fetched successfully",
        totalusers,
        totalvendors,
        totalorders,
        totalproducts,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}

async function handlerecentactivities(req, res) {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user");
    const recentUsers = await User.find({ role: "USER" })
      .sort({ createdAt: -1 })
      .limit(5);
    const recentVendors = await User.find({ role: "VENDOR" })
      .sort({ createdAt: -1 })
      .limit(5);
 const recentVendorsapprove = await User.find({ role: "VENDOR" ,isApproved:true})
      .sort({ createdAt: -1 })
      .limit(5);
    const activities = [
      ...recentOrders.map((order) => ({
        type: "order",
        message: "New Order Placed",
        createdAt: order.createdAt,
      })),
      ...recentUsers.map((user) => ({
        type: "user",
        message: "New User Registered",
        createdAt: user.createdAt,
      })),
       ...recentVendors.map((vendor) => ({
        type: "vendor",
        message: "New Vendor Registered",
        createdAt:vendor.createdAt,
      })),
       ...recentVendors.map((vendor) => ({
        type: "vendor",
        message: "New Vendor Registered",
        createdAt:vendor.createdAt,
      })),
       ...recentVendorsapprove.map((vendor) => ({
        type: "vendorapproved",
        message: "New Vendor Approved",
        createdAt:vendor.createdAt,
      })),
    ];

    activities.sort((a,b)=>b.createdAt-a.createdAt)
    return res.status(200).json({message:"recent activities fetched",activities})
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}
module.exports = {
  handlemanagevendors,
  handledashboard,
  handleusers,
  handlevendorapproval,
  
  handlerecentactivities,
  handlevendorrejection,
  handledeleteuser
};
