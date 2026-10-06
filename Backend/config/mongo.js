import mongoose from "mongoose";

export const mongoReady = mongoose.connect(process.env.MONGO_URI).then((connection)=>{
    console.log("Mongo connected")
    return connection
}).catch((err)=>{
    console.error("Mongo connection error:", err.message)
    return null
})
