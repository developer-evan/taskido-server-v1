// src/routes/profileRoutes.ts
import { Router } from "express";
import { getUserProfile, upsertUserProfile } from "../controllers/profileController";
import { authenticateUser } from "../middleware/authMiddleware"; // Import the authentication middleware

const router = Router();

// Protect the routes with authentication middleware
router.get("/profile", authenticateUser, getUserProfile);
router.post("/profile", authenticateUser, upsertUserProfile); // Use POST for both create and update

export default router;
