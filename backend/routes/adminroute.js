const express = require("express");
const router = express.Router();

const { handlemanagevendors, handleusers, handlevendorapproval, handlevendorrejection, handledashboard, handlerecentactivities } = require("../controllers/Admin");


router.get("/managevendors",handlemanagevendors)

router.get("/manageusers",handleusers)
router.patch("/managevendors/approve/:id",handlevendorapproval );

router.delete("/managevendors/reject/:id", handlevendorrejection);

router.get("/dashboard",handledashboard);
router.get("/recentactivities",handlerecentactivities)
module.exports = router;


