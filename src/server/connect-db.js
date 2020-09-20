import mongoose from "mongoose";

const url = `mongodb://localhost:27017/TourGuide`;

export async function connectDB() {
  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
  });
}

connectDB();
