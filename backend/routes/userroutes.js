const express = require("express");
const { handleplaceorders, handleorders, handlecancelorders, handlecart, handlecartupdate, handlegetcart, handledeletecart } = require("../controllers/user");

const router = express.Router();



router.post("/cart",handlecart);
router.get("/cart",handlegetcart);
router.patch("/cart/:productId",handlecartupdate);
router.delete("/cart/:productId",handledeletecart);
router.post("/orders",handleplaceorders);
router.get("/orders",handleorders)
router.patch("/orders/:orderid",handlecancelorders);
module.exports=router