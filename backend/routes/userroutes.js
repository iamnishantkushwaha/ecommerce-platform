const express = require("express");
const { handleplaceorders, handleorders, handlecancelorders } = require("../controllers/user");

const router = express.Router();




router.post("/orders",handleplaceorders);
router.get("/orders",handleorders)
router.patch("/orders/:orderid",handlecancelorders);
module.exports=router