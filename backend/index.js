const express = require("express");
const { connectdatabase } = require("./connectiondb");
require("dotenv").config();
const app = express();
const path=require("path")
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const cookieParser = require("cookie-parser");
const cors = require("cors");


const Staticrouter = require("./routes/Staticroutes");
const adminroute=require("./routes/adminroute")
const vendorroute=require("./routes/vendorroute");
const userroute=require("./routes/userroutes")
const { protect } = require("./middlewares/protect");
const {rolecheck} =require("./middlewares/rolecheck")
connectdatabase(MONGO_URL);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_VITE_BASE_URL,
    credentials: true
  }));
app.use("/uploads",express.static(path.resolve("public/uploads")))
app.use("/api/", Staticrouter);
app.use("/api/user",protect, userroute);
app.use("/api/admin/",protect,rolecheck("ADMIN"),adminroute)
app.use("/api/vendor/",protect,rolecheck("VENDOR"),vendorroute)
app.get("/api/me",protect,(req,res)=>{
  console.log(req.user);
  return res.json({user:req.user})
})
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
