require("dotenv").config();
const express = require("express");
const { connectdatabase } = require("./connectiondb");
const ratelimit=require("express-rate-limit")

const app = express();
const path=require("path")
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const cookieParser = require("cookie-parser");
const cors = require("cors");



const userLimiter = ratelimit({
  windowMs: 60 * 1000,
  max: 100,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many user requests. Please wait and try again."
    });
  }
});

const adminLimiter = ratelimit({
  windowMs: 60 * 1000,
  max: 50,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many admin requests. Please wait and try again."
    });
  }
});

const vendorLimiter = ratelimit({
  windowMs: 60 * 1000,
  max: 50,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many vendor requests. Please wait and try again."
    });
  }
});

const publicLimiter = ratelimit({
  windowMs: 60 * 1000,
  max: 100,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please slow down."
    });
  }
});
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
app.use("/api/", publicLimiter, Staticrouter);
app.use("/api/user", userLimiter, protect, userroute);
app.use("/api/admin", adminLimiter, protect, rolecheck("ADMIN"), adminroute);
app.use("/api/vendor", vendorLimiter, protect, rolecheck("VENDOR"), vendorroute);

app.get("/api/me", userLimiter, protect, (req, res) => {
  console.log(req.user);
  return res.json({ user: req.user });
});
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
