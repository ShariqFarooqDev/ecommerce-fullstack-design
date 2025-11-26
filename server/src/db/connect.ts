import mongoose from "mongoose";

let isConnected = false;

const connectDB = async (url: string) => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(url);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
