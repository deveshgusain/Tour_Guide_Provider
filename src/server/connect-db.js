import mongoose from "mongoose";

const url = process.env.MONGODB_URI || `mongodb://localhost:27017/TourGuide`;

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
