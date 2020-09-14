import { defaultState } from "./defaultState";
import { connectDB } from "./connect-db";

async function initializeDB() {
  const db = await connectDB();
  const user = await db.collection(`users`).findOne({ username: "test" });
  if (!user) {
    for (const collectionName in defaultState) {
      const collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
}
initializeDB();
