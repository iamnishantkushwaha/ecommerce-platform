const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.patch("/managevendors/approve/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  try {
    await User.findOneAndUpdate({ _id: id }, { isApproved: true });
    return res.status(200).json({ message: "Vendor Approved successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
});

router.delete("/managevendors/reject/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await User.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Vendor Rejected successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Vendor doent exists" });
  }
});


module.exports = router;
