import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async() => {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
        console.log("MongoDB connection skipped: set MONGODB_URI or MONGO_URI in backend/.env");
        return;
    }

    try {
        const con = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${con.connection.host}`);
    }
    catch(error) {
        console.log(`MongoDB connection error: ${error.message}`);
        // Don't exit process for now, just log the error
        console.log("Continuing without database connection...");
    }
}

export default connectDB;
