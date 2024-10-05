import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_URL = `mongodb+srv://rk0484151:${process.env.DB_Password}@cluster0.tsuco.mongodb.net/drWorld?retryWrites=true&w=majority&appName=Cluster0`;
async function dbConnect() {
  try {
    mongoose
      .connect(DB_URL, {
        serverSelectionTimeoutMS: 30000, // 30 seconds timeout for initial connection
        socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
      })
      .then((result) => {
        console.log("Conneted to database");
      })
      .catch((err) => {
        console.log(err);
        // throw err;
      });
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
