import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"

import travelStoryRoutes from "./routes/travelStory.route.js";

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  const app = express();

  app.use(cookieParser()); // for parsing cookies in incoming requests

  //for allowing json data in request body
app.use(express.json());



app.listen(3000);
console.log('Server is running on http://localhost:3000');

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/travel-story", travelStoryRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})