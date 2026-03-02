const mongoose=require("mongoose");

async function connectdatabase(url)
{
    return  await mongoose.connect(url).then(()=>console.log("MongoDB connected Successfully")).catch((error)=>console.log(error));
}

module.exports={connectdatabase}