import express from "express";
import { collectEvent } from "../controllers/eventControllers.js";
import { apiKeyAuth } from "../middleware/apiKeyMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/event/collect:
 *   post:
 *     summary: Collect an event
 *     description: Stores event data from client-side tracking.
 *     security:
 *       - ApiKeyAuth: [] # Uses x-api-key authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *                 example: "login_button_click"
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com"
 *               referrer:
 *                 type: string
 *                 format: uri
 *                 example: "https://google.com"
 *               device:
 *                 type: string
 *                 example: "mobile"
 *               ipAddress:
 *                 type: string
 *                 example: "192.168.1.1"
 *               metadata:
 *                 type: object
 *                 example: { "browser": "Chrome", "os": "Android" }
 *     responses:
 *       200:
 *         description: Event collected successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (Invalid API Key)
 */
router.post("/collect", apiKeyAuth, collectEvent);

export default router;
