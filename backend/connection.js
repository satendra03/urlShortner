import mongoose from "mongoose";

// Connect to MongoDB
export const connectMongoDB = async (url) => {
  return await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB: ", error);
    });
};
