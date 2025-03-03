import express from "express";
import {
  registerApp,
  getUserApps,
  getAppById,
  updateApp,
  deleteApp,
} from "../controllers/appController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();


/**
 * @swagger
 */
router.post("/register_app", authenticateUser, registerApp); // Register a new app
/**
 * @swagger
 */
router.get("/user/:userId", authenticateUser, getUserApps); // Get all apps for a user
/**
 * @swagger
 */
router.get("/:appId", authenticateUser, getAppById); // Get a specific app
/**
 * @swagger
 */
router.put("/:appId", authenticateUser, updateApp); // Update app name
/**
 * @swagger
 */
router.delete("/:appId", authenticateUser, deleteApp); // Delete app

export default router;
