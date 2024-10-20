import express from "express";
import * as dotenv from "dotenv";
import bodyParser = require("body-parser");
import connectDB from "./config/dbConfig";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

 const app = express();
// const express = require("express");
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("MongoDB URL is not defined in the environment variables");
  process.exit(1);
}

// Connect to MongoDB
connectDB(MONGO_URL);

// Middleware
app.use(bodyParser.json());

// Routes
// app.use("/", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", profileRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
