import mongoose from "mongoose";
let isConnected = false;

export const database = process.env.DB.replace(
  "<password>",
  process.env.DB_PASS
);

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongo db is already connected");
    return;
  }
  try {
    await mongoose.connect(database, {
      dbName: "prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;

    console.log("mongo db connected");
  } catch (err) {
    console.log("there is an error");
  }
};
