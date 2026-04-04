// Import required modules
const express = require("express");
const {
  handleproduct,
  handleproductupload,
  handleproductupdate,
  handledelete,
  handleorders,
  handleorderstatus,
  handledashboard,
  handleupdateprofile,
  handleprofile,
  handleshippingdetails,
} = require("../controllers/vendors");
const router = express.Router();
const upload = require("../middlewares/upload");

// Route to add a new product with image upload
router.post("/add-product",upload.single("image"), handleproductupload);

// Route to get all products for the vendor
router.get("/product",  handleproduct);

// Route to delete a product by ID
router.delete("/product/:id", handledelete);

router.get("/profile",handleprofile)
router.patch("/profile",handleupdateprofile)
router.get("/dashboard",handledashboard)
// Route to update a product by ID with optional image upload
router.patch("/product/:id", upload.single("image"), handleproductupdate);
router.patch("/orders/shippingdetails/:id",handleshippingdetails);
router.get("/orders",handleorders);
router.patch("/orders/:orderid",handleorderstatus);
// Export the router
module.exports = router;
