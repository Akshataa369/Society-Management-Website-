import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// ✅ Fix CORS Issue
const corsOptions = {
  origin: "http://localhost:5173", // ✅ Allow only frontend origin
  credentials: true, // ✅ Allow sending cookies & tokens
  methods: ["GET", "POST", "PUT", "PATCH","DELETE"], // ✅ Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
};
app.use(cors(corsOptions));

// ✅ Middleware for parsing JSON and URL-encoded data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ✅ Serve static uploads folder correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads/events", express.static(path.join(__dirname, "uploads/events"))); // ✅ No need for `process.cwd()`

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} | Visit: http://localhost:${PORT}`);
});
