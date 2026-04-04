const Product = require("../models/product");
const Order = require("../models/orders");
const User =require("../models/user")
async function handleproductupload(req, res) {
  const { title, description, price, stock, category } = req.body;
  console.log(req.file);
  try {
    const isproductpresent = await Product.findOne({
      title,
      description,
      price,
    });

    if (isproductpresent)
      return res.status(409).json({ message: "product already present" });

    if (!isproductpresent)
      await Product.create({
        title,
        description,
        price,
        image: req.file.path,
        stock,
        category,
        vendor: req.user._id,
      });
    return res.status(201).json({ message: "product added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Server error`, error: err.message });
  }
}

async function handleproduct(req, res) {
  try {
    const products = await Product.find({ vendor: req.user._id });

    if (!products) return res.status(404).json({ message: "No product Found" });
    return res.status(200).json({ message: "product found", products });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function handledelete(req, res) {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    if (!product) return res.status(404).json({ message: "No product Found" });
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function handleproductupdate(req, res) {
  try {
    const { title, description, price, image, stock, category } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, price, image, stock, category },
    );
    if (!product) return res.status(404).json({ message: "No product Found" });
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function handleorders(req, res) {
  try {
    const Orders = await Order.find({ vendor: req.user._id }).populate(
      "user",
      "fullName",
    );
    if (!Orders) return res.status(404).json({ message: "No Order Found" });
    return res
      .status(200)
      .json({ message: "Order Fetched Successfully", Orders });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}

async function handleshippingdetails(req,res){
  try{
   const {couriername,trackingId,estimatedDelivery}=req.body;
    if (!couriername || !trackingId || !estimatedDelivery) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const order=await Order.findOneAndUpdate({_id:req.params.id},{
      courierName:couriername,
      trackingId,
      estimatedDelivery
    },{ new: true })
      if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({message:"Order Shipping Detail Updated Successfully"})
  }catch(err){
    return res.status(500).json({message:"Server Error",
      Error:err.message
    })
  }
}
async function handleorderstatus(req, res) {
  try {
    const orderid = req.params.orderid;
    const { orderStatus, paymentStatus } = req.body;
    const Orders = await Order.findOneAndUpdate(
      { _id: orderid },
      { orderStatus, paymentStatus },
    );
    console.log(Orders);

    return res.status(200).json({ message: "Order Fetched Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function handledashboard(req, res) {
  try {
    const order = await Order.find({ vendor: req.user._id });
    if (order.length === 0)
      return res.status(404).json({ message: "No Order Found" });
    const totalsales = order.reduce((acc, item) => {
      const ordertotal = item.products.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
      return acc + ordertotal;
    }, 0);

    const totalRevenue = order.reduce((acc, item) => {
      return acc + item.totalAmount;
    }, 0);

    const totalOrders = order.length;
    const totalproducts = await Product.find({
      vendor: req.user._id,
    }).countDocuments();

    const monthlymap = {};
   const  monthlyRevenueMap ={}
    for (const item of order) {
      const month = new Date(item.createdAt).toLocaleString("default", {
        month: "short",
      });
      const OrderQuantity = item.products.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
      
      if (!monthlymap[month]) {
        monthlymap[month] = OrderQuantity;
      } else {
        monthlymap[month] += OrderQuantity;
      }

      if (!monthlyRevenueMap[month]) {
    monthlyRevenueMap[month] = item.totalAmount;
  } else {
    monthlyRevenueMap[month] += item.totalAmount;
  }
    }
 


const monthlyRevenue = Object.keys(monthlyRevenueMap).map((month) => ({
  month,
  revenue: monthlyRevenueMap[month],
}));
    const monthlysales = Object.keys(monthlymap).map((month) => ({
      month,
      sales: monthlymap[month],
    }));

    return res.status(200).json({
      message: "dashboard data fetched",
      totalsales,
      totalRevenue,
      totalOrders,
      totalproducts,
      monthlysales,
      monthlyRevenue
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}

async function handleprofile(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(401).json({ message: "unauthorized" });
    return res.status(200).json({ message: "user found", user });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      Error: err.message,
    });
  }
}
async function handleupdateprofile(req, res) {
  try {
    const { fullName, email, phoneNumber } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { fullName, email, phoneNumber },
    );
    if (!user) return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}

module.exports = {
  handleproduct,
  handledashboard,
  handleproductupload,
  handledelete,
  handleproductupdate,
  handleorders,
  handleprofile,
  handleupdateprofile,
  handleshippingdetails,
  handleorderstatus,
};
