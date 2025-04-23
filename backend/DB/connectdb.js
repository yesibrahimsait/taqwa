import mongoose from "mongoose"
export const connectdb=async()=>{
   await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("The Mongo connected")).catch((err)=>console.log("The Db not connected :"+err))
}