import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;
