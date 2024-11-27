import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    process.exit(1);
  }
};

export default connectDB;
