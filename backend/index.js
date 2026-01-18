import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express();

import authRoutes from "./routes/auth.route.js";

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  //for allowing json data in request body
app.use(express.json());

app.listen(3000);
console.log('Server is running on http://localhost:3000');

app.use("/api/auth", authRoutes);
