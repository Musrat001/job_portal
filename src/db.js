import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDb = async () => {
    try {
        const dbHost = await mongoose.connect(process.env.mongodb_uri);
        console.log(`MongoDB connected Successfully. Host: ${dbHost}`);

    } catch (error) {
        console.log("Error While Connecting to Database!", error);
    }
}

export default connectDb;