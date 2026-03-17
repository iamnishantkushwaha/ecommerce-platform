const express = require("express");
const { handleplaceorders, handleprofile,handleorders, handlecancelorders, handlecart, handlecartupdate, handlegetcart, handledeletecart, handleupdateprofile, handlepasswordchange } = require("../controllers/user");

const router = express.Router();



router.post("/cart",handlecart);
router.get("/cart",handlegetcart);
router.patch("/cart/:productId",handlecartupdate);
router.delete("/cart/:productId",handledeletecart);
router.post("/orders",handleplaceorders);
router.get("/orders",handleorders)
router.patch("/orders/:orderid",handlecancelorders);
router.get("/profile",handleprofile);
router.patch("/profile",handleupdateprofile);
router.patch("/passwordchange",handlepasswordchange);
module.exports=router