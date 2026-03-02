const express = require("express");
const { connectdatabase } = require("./connectiondb");
require("dotenv").config();
const app = express();
const path=require("path")
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const cookieParser = require("cookie-parser");
const Staticrouter = require("./routes/Staticroutes");
const adminroute=require("./routes/adminroute")
const vendorroute=require("./routes/vendorroute");
const { protect } = require("./middlewares/protect");
const { authMiddleware } = require("./middlewares/rolecheck");

connectdatabase(MONGO_URL);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads",express.static(path.resolve("public/uploads")))
app.use("/api/", Staticrouter);
app.use("/api/admin/",protect,authMiddleware("ADMIN"),adminroute)
app.use("/api/vendor/",protect,authMiddleware("VENDOR"),vendorroute)
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
