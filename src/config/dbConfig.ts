import mongoose from "mongoose";

export const conn = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
console.log("kjkm,l,l",process.env.MONGO_URI)
if (!process.env.MONGO_URI) {
  throw new Error("MONGODB_URI is not defined");
}

        console.log("Mongo connected",mongoose.connection.name)
    } catch (error) {
        console.log("Error in connecting to mongo", error)
    }
}