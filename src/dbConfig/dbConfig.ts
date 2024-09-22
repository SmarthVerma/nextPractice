import mongoose from "mongoose";
import { DB_NAME } from "./DB_NAME";

export async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDb connection error, please make sure db is up and running",
        err
      );
      process.exit;
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
}
