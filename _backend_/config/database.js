import mongoose from "mongoose";

const connectDatabase = async () => {

    try {

        if (!process.env.MONGO_URI) {

            throw new Error("MONGO_URI is missing in .env");

        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("================================");
        console.log("MongoDB Connected Successfully");
        console.log("Database Ready");
        console.log("================================");

    } catch (error) {

        console.error("================================");
        console.error("Database Connection Failed");
        console.error(error.message);
        console.error("================================");

        process.exit(1);

    }

};

export default connectDatabase;