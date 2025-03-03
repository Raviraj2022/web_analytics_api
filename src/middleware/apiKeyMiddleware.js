import prisma from "../prismaClient.js";

export const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"]; // Read API Key from headers

  if (!apiKey) return res.status(401).json({ error: "API key required" });

  const key = await prisma.apiKey.findUnique({ where: { apiKey } });

  if (!key || !key.isActive) return res.status(403).json({ error: "Invalid API key" });

  req.appId = key.appId; // Attach appId for further use
  next(); // Allow request to proceed
};
