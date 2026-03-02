const express = require("express");
const router = express.Router();


router.get("/orders",handleorders);


module.exports=router