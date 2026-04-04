const express = require("express");
const router = express.Router();

const {
  handlemanagevendors,
  handleusers,
  handlevendorapproval,
  handlevendorrejection,
  handledashboard,
  handlerecentactivities,
  handledeleteuser,
  handledeletevendor,
} = require("../controllers/Admin");

router.get("/managevendors", handlemanagevendors);

router.get("/manageusers", handleusers);
router.delete("/deleteuser/:id", handledeleteuser);
router.patch("/managevendors/approve/:id", handlevendorapproval);
router.patch("/managevendors/reject/:id", handlevendorrejection);
router.delete("/deletevendor/:id", handledeletevendor);
router.get("/dashboard", handledashboard);
router.get("/recentactivities", handlerecentactivities);
module.exports = router;
