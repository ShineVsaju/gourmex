require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MongoDB URI:", MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in an "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// API Route for File Upload & Text Extraction
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = `uploads/${req.file.filename}`;

  // Run the Python script for text extraction
  exec(`python extract_text.py ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", stderr);
      return res.status(500).json({ message: "Error processing PDF" });
    }
    
    res.json({ 
      message: "File processed successfully", 
      extractedText: stdout 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
