import express from "express";
import {
  handleUploads,
  listTemplates,
  countTemplates,
  getImages,
  getResume,
  getToken,
} from "../controllers/apiController.js";

import { uploadFile, uploadImage } from "../config/db.js";

const router = express.Router();

// GET /
router.get("/", (req, res) => {
  res.status(200).send("Hi from API");
});

// POST Upload Templates and images
router.post(
  "/upload",
  uploadFile.single("template"),
  uploadImage,
  handleUploads
);
// GET all Templates
router.get("/templates", listTemplates);
// GET template count
router.get("/templates/count", countTemplates);
// GET image (URL for image)
router.get("/image/:id", getImages);
// POST data about resume and get pdf
router.post("/resume", getResume);
// Get token via Login
router.get("/login", getToken);

export default router;
