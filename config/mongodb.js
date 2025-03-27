import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI||"mongodb+srv://23kundanrajendra:MnRXP5fopDxt4p4j@urbannest.pf1zp.mongodb.net/");
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectdb;
