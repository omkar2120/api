import mongoose from "mongoose";
const DB_URL = "mongodb://127.0.0.1:27017";

const connectDB = async () => {
  try {
    const createConnection = await mongoose.connect(DB_URL, {
      dbName: "college",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //  console.log(connection.STATES);
    if (createConnection.STATES.connected) {
      console.log("Database connection successfully");
    } else {
      console.log("Database connection failed");
    }
  } catch (error) {
    const { name, message } = error;
    console.log(`${name} => ${message}`);
  }
};

export default connectDB;
