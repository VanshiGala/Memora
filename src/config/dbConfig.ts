// import mongoose from "mongoose";

// export const conn = async() => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI!)
// console.log("kjkm,l,l",process.env.MONGO_URI)
// if (!process.env.MONGO_URI) {
//   throw new Error("MONGODB_URI is not defined");
// }

//         console.log("Mongo connected",mongoose.connection.name)
//     } catch (error) {
//         console.log("Error in connecting to mongo", error)
//     }
// }

import mongoose from "mongoose";

export const conn = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    await mongoose.connect(uri);

    console.log("Mongo connected:", mongoose.connection.host);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // IMPORTANT: re-throw error
  }
};
