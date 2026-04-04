const User = require("../models/user");
const Order = require("../models/orders");
const Product = require("../models/product");
const bcrypt=require("bcrypt")
async function handlemanagevendors(req, res) {
  try {
    const vendors = await User.find({ role: "VENDOR" });
    if (!vendors)
      return res.status(404).json({ message: "vendors not available" });

    return res.status(200).json({ message: "vendor fetched", vendors });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
}
async function handleusers(req, res) {
  try {
    const users = await User.find({ role: "USER" });
    if (!users) return res.status(404).json({ message: "users not available" });

    return res.status(200).json({ message: "users fetched", users });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "server error", Error: err.message });
  }
}


async function handleorders(req, res) {
  try {
    const orders = await Order.find().populate("user","fullName");
    if (!orders) return res.status(404).json({ message: "Orders Not Found" });

    return res.status(200).json({ message: "Order fetched", orders });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "server error", Error: err.message });
  }
}

async function handledeleteuser(req, res) {
  try {
    const userId = req.params.id;
    const users = await User.findByIdAndDelete(userId);
    if (!users) return res.status(404).json({ message: "User not Found" });

    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "server error", Error: err.message });
  }
}

async function handlevendorapproval(req, res) {
  const id = req.params.id;

  try {
    await User.findOneAndUpdate({ _id: id }, { approvalStatus: "APPROVED" });
    return res.status(200).json({ message: "Vendor Approved successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
}
async function handlevendorrejection(req, res) {
  const id = req.params.id;

  try {
    await User.findOneAndUpdate({ _id: id }, { approvalStatus: "REJECTED" });
    return res.status(200).json({ message: "Vendor Rejected successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
}

async function handledeletevendor(req, res) {
  const id = req.params.id;

  try {
    await User.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Vendor Deleted successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor Not Found" });
  }
}

async function handledeleteproduct(req, res) {
  const id = req.params.id;

  try {
    const products = await Product.findOneAndDelete({ _id: id });
    if (!products)
      return res.status(404).json({ message: "Product Not Found" });
    return res.status(200).json({ message: "Product Deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}
async function handlefeatureproduct(req, res) {
  try {
    const { featured } = req.body;
    const id = req.params.id;
    const products = await Product.findOneAndUpdate(
      { _id: id },
      { isFeatured: featured },
    );
    if (!products)
      return res.status(404).json({ message: "Product Not Found" });
    return res
      .status(200)
      .json({ message: "Product features updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}
async function handledashboard(req, res) {
  try {
    const totalvendors = await User.countDocuments({ role: "VENDOR" });
    const totalusers = await User.countDocuments({ role: "USER" });
    const totalorders = await Order.countDocuments();
    const totalproducts = await Product.countDocuments();
    return res.status(200).json({
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
    const recentVendorsapprove = await User.find({
      role: "VENDOR",
      approvalStatus: "APPROVED",
    })
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
        createdAt: vendor.createdAt,
      })),
      
      ...recentVendorsapprove.map((vendor) => ({
        type: "vendorapproved",
        message: "New Vendor Approved",
        createdAt: vendor.createdAt,
      })),
    ];

    activities.sort((a, b) => b.createdAt - a.createdAt);
    return res
      .status(200)
      .json({ message: "recent activities fetched", activities });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}

async function handleaddadmin(req,res){
  try {
    const { fullName, email, phoneNumber, password } = req.body;
   
    const user = await User.findOne( {email} );
    if (user) return res.status(400).json({ message: "Admin already Existed" });
    const hashpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashpassword,
      role:"ADMIN"
    });
    return res.status(201).json({message:`ADMIN created successfully`});
  } catch (err) {
   
  return res.status(500).json({ message: "Server Error", Error:err.message });
  }
}

module.exports = {
  handlemanagevendors,
  handledashboard,
  handleaddadmin,
  handledeletevendor,
  handleorders,
  handleusers,
  handlevendorapproval,
  handlefeatureproduct,
  handlerecentactivities,
  handlevendorrejection,
  handledeleteuser,
  handledeleteproduct,
};
