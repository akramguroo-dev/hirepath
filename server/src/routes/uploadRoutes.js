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

const upload = multer({ storage });

router.post("/profile-photo", authMiddleware, upload.single("file"), (req, res) => {
  res.json({ url: req.file.path });
});

router.post("/resume", authMiddleware, upload.single("file"), (req, res) => {
  res.json({ url: req.file.path });
});

router.post("/logo", authMiddleware, upload.single("file"), (req, res) => {
  res.json({ url: req.file.path });
});

module.exports = router;