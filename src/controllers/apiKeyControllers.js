// import express from 'express';
import crypto from 'crypto';
import prisma from '../prismaClient.js';
// import { authenticateUser } from '../middleware/authMiddleware.js';

// const router = express.Router();

// Generate API Key
// const generateApiKey = () => crypto.randomBytes(32).toString('hex');

// Create API Key
// router.post('/generate', authenticateUser, 
export const createApiKey = async (req, res) => {
  try {
    const { appId, apiKey } = req.body;

    // Convert appId to an integer
    const appIdInt = parseInt(appId, 10);
    if (isNaN(appIdInt)) {
      return res.status(400).json({ error: "Invalid appId, must be an integer." });
    }

    // ✅ Check if the app exists
    const appExists = await prisma.app.findUnique({ where: { id: appIdInt } });
    if (!appExists) {
      return res.status(404).json({ error: "App ID not found. Please register the app first." });
    }

    // ✅ Create the API Key
    const newApiKey = await prisma.apiKey.create({
      data: { 
        appId: appIdInt,
        apiKey
      },
    });

    res.status(201).json(newApiKey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Revoke API Key
// router.post('/revoke', authenticateUser, 
    export const revokeApiKey =async (req, res) => {
        try {
  const { apiKey } = req.body;
  await prisma.apiKey.updateMany({
    where: { apiKey },
    data: { isActive: false },
  });

  res.json({ message: 'API Key revoked' });
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

// export default router;
