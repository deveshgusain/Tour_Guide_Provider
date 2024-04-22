import mongoose from "mongoose";

require('dotenv').config()

const url = process.env.DATABASE_URL;

export async function connectDB() {
  const db = await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log(`DB Connection Error: ${err.message}`);
    });
}

connectDB();
