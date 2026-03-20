import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo connected")
}).catch((err)=>{
    console.log("Mongo connection error:", err)
})