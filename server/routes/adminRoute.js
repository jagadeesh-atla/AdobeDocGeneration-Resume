import express from "express";
import {
  greet,
  deleteAll,
  deleteSpecific,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ONLY ADMINS
router.get("/", protect, greet);
// DELETE specific template
router.delete("/delete", protect, deleteAll);
// DELETE all Templates
router.delete("/delete/:id", protect, deleteSpecific);

export default router;
