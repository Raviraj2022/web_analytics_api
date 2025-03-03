import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { createApiKey, revokeApiKey } from "../controllers/apiKeyControllers.js";

const router = express.Router();

/**
 * @swagger
 * /api/key/generate:
 *   post:
 *     summary: Generate a new API key
 *     description: Generates an API key for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appId:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       201:
 *         description: API key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *                   example: "9c84daaac24741ba17a757f90274d04dbb3926fb65b52310385393"
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.post("/generate", authenticateUser, createApiKey);

/**
 * @swagger
 * /api/key/revoke:
 *   post:
 *     summary: Revoke an API key
 *     description: Revokes an API key for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apiKey:
 *                 type: string
 *                 example: "9c84daaac24741ba17a757f90274d04dbb3926fb65b52310385393"
 *     responses:
 *       200:
 *         description: API key revoked successfully
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.post("/revoke", authenticateUser, revokeApiKey);

export default router;
