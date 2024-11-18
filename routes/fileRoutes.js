const express = require("express");
const multer = require("multer");
const { uploadFile, listFiles, downloadFile } = require("../controllers/fileControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/files", authMiddleware, listFiles);
router.get("/download/:id", authMiddleware, downloadFile);

module.exports = router;
