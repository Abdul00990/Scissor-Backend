import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
