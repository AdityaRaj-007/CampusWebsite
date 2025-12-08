import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connect to database!");
  } catch (err) {
    console.error("Error occurred while connecting to database", err);
  }
};
