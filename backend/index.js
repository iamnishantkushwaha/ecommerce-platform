const express=require("express");
const { connectdatabase } = require("./connectiondb");
require("dotenv").config();
const app=express();
const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;

connectdatabase(MONGO_URL)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));