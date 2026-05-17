const express = require("express");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary configured:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✓ set" : "✗ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ set" : "✗ missing",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  folder: "hirepath",
  allowedFormats: ["jpg", "jpeg", "png", "pdf"],
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Error handler middleware
const uploadErrorHandler = (err, req, res, next) => {
  console.error("Multer error:", err);
  res.status(400).json({ error: err.message });
};

router.post("/profile-photo", 
  authMiddleware, 
  upload.single("file"),
  uploadErrorHandler,
  (req, res) => {
    try {
      console.log("File received:", req.file);
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      res.json({ url: req.file.path });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message || "Upload failed" });
    }
  }
);

router.post("/resume", authMiddleware, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ url: req.file.path });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

router.post("/logo", authMiddleware, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ url: req.file.path });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

module.exports = router;