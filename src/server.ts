import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/socialNetworkDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
