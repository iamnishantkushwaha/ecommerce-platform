const Product = require("../models/product");
const Order = require("../models/orders");
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const User = require("../models/user");
const bycrpt = require("bcrypt");
async function handleplaceorders(req, res) {
  try {
    if (!req.user) return res.status(401).json({ message: "unauthorized" });
    const { products, deliveryAddress } = req.body;

    if (!products || !Array.isArray(products) || products.length == 0)
      return res.status(404).json({ message: "Products are required" });

    if (!deliveryAddress) {
      return res
        .status(400)
        .json({ message: "Delivery address is required"});
    }
   console.log(products,"kl");
    let orderItems = [];
    let totalAmount = 0;
    let vendor = null;
    for (const item of products) {
      const { productId, quantity } = item;
      if (!productId || !quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid product data"});
      }
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: "product not found" });
      if (product.stock < quantity)
        return res
          .status(400)
          .json({
            message: `${product.title} have  only ${product.stock} available`,
          });
      product.stock -= quantity;
      vendor=product.vendor;
      await product.save();
      orderItems.push({
        product: product._id,
        productName: product.title,
        quantity,
        price: product.price,
      });

      totalAmount = product.price * quantity;
    }
    await Order.create({
      user: req.user._id,
      vendor,
      products: orderItems,
      totalAmount,
      deliveryAddress,
    });
     
    return res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}

async function handletrackorder(req,res){
 
  
  try{
     const {orderId}=req.params;
     
    const trackedorder=await Order.findById({_id:orderId});
    if(!trackedorder) return res.status(404).json({message:"No order to track"})
    return res.status(200).json({message:"find order to track",
  trackedorder },
      
    )
  }catch(err){
    return res.status(500).json({message:"Server Error",
      Error:err.message
    })
  }
}
async function handleorders(req, res) {
  try {
    const Orders = await Order.find({ user: req.user._id });
    if (Orders.length == 0)
      return res.status(404).json({ message: "No Order Found" });
    return res
      .status(200)
      .json({ message: "Order Fetched Successfully", orders: Orders });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function handleLatestOrder(req, res) {
  try {
    const order = await Order.findOne({ user: req.user._id })
      .sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({ message: "No Order Found" });
    }

    return res.status(200).json({
      message: "Latest Order Fetched Successfully",
      order
    });

  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
}
async function handlecancelorders(req, res) {
  try {
    if (!req.user) return res.status(401).json({ message: "unauthorized" });
    const cancelorderid = req.params.orderid;

    const CancelOrder = await Order.findByIdAndUpdate(cancelorderid, {
      orderStatus: "Cancelled",
    });
    if (!CancelOrder)
      return res.status(404).json({ message: "order not found" });
    const product = await Product.findById(CancelOrder.products[0].product);
    product.stock += CancelOrder.products[0].quantity;
    console.log(CancelOrder.products[0].quantity);
    await Product.findByIdAndUpdate(CancelOrder.products[0].product, {
      stock: product.stock,
    });

    return res.status(200).json({ message: "Order cancelled Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function handlecart(req, res) {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart = await Cart.findByIdAndUpdate(cart._id, {
        quantity: cart.quantity + quantity,
      });
    }
    // If cart does not exist

    const existingitem = cart.products.find(
      (item) => item.product.toString() === productId,
    );

    if (existingitem) {
      existingitem.quantity += quantity;
    }
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        products: [
          {
            product: productId,
            quantity: quantity,
          },
        ],
      });

      return res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    }

    // Check if product already exists in cart
    const item = cart.products.find((p) => p.product.toString() === productId);

    if (item) {
      return res.status(409).json({
        message: "Product already in cart",
      });
    }

    // Add new product
    cart.products.push({
      product: productId,
      quantity: quantity,
    });

    await cart.save();

    return res.status(201).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function handlegetcart(req, res) {
  try {
    console.log(req.user);
    console.log(mongoose.modelNames());
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
    );

    if (!cart) return res.status(404).json({ message: "cart is empty" });

    return res.status(200).json({ message: " product is in cart", cart });
  } catch (error) {
    console.log(error); // ADD THIS

    return res.status(500).json({ message: "server error" });
  }
}

async function handlecartupdate(req, res) {
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "cart not found" });
    const item = cart.products.find((p) => p.product.toString() === productId);
    console.log("items", item);
    if (!item) return res.status(404).json({ message: "product not found" });
    item.quantity = quantity;
    await cart.save();
    console.log("cart", cart);
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
    );
    return res.status(200).json({ message: "cart updated", cart: updatedCart });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
}

async function handledeletecart(req, res) {
  try {
    const productId = req.params.productId;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "cart is empty" });
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId,
    );
    await cart.save();
    const updatedcart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
    );
    return res
      .status(200)
      .json({ message: "  product removed from cart", cart: updatedcart });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
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

async function handlepasswordchange(req, res) {
  try {
    const { currentpassword, newpassword } = req.body;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).json({ message: "user not found" });
    const matchpassword = await bycrpt.compare(currentpassword, user.password);
    if (!matchpassword)
      return res.status(401).json({ message: "Incorrect password" });
    const hashpassword = await bycrpt.hash(newpassword, 10);
    console.log(hashpassword);
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { password: hashpassword },
    );
    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: err.message });
  }
}
module.exports = {
  handleplaceorders,
  handletrackorder,
  handleprofile,
  handlepasswordchange,
  handleupdateprofile,
  handleorders,
  handlecancelorders,
  handlecart,
  handlegetcart,
  handlecartupdate,
  handledeletecart,
  handleLatestOrder
};
