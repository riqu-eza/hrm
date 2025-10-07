/* eslint-disable @typescript-eslint/no-explicit-any */
// /lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

// Use a global cache to prevent re-connections and model overwrites
let cached = (global as any)._mongooseCache;

if (!cached) {
  cached = (global as any)._mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  // If already connected, return it
  if (cached.conn) {
    return cached.conn;
  }

  // Otherwise, connect once and reuse
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // Optional safety flags
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
