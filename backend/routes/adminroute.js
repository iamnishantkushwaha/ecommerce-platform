const express = require("express");
const router = express.Router();

const { handlemanagevendors, handleusers, handlevendorapproval, handlevendorrejection } = require("../controllers/Admin");


router.get("/managevendors",handlemanagevendors)

router.get("/manageusers",handleusers)
router.patch("/managevendors/approve/:id",handlevendorapproval );

router.delete("/managevendors/reject/:id", handlevendorrejection);


module.exports = router;
