import prisma from "../prismaClient.js";
import redis from "../redisClient.js";

export const collectEvent = async (req, res) => {
  try {
    const { eventName, url, referrer, device, ipAddress, metadata, timestamp } = req.body;

    await prisma.event.create({
      data: {
        appId: req.appId,
        eventName,
        url,
        referrer,
        device,
        ipAddress,
        metadata,
        timestamp: timestamp ? new Date(timestamp) : new Date()  // Use provided timestamp or set current time
      },
    });

    res.status(201).json({ message: "Event collected successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getEventSummary = async (req, res) => {
  const { eventName, startDate, endDate, appId } = req.body;

  const cacheKey = `event-summary:${eventName}:${startDate}:${endDate}:${appId}`;

  // Check if data exists in cache
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return res.json(JSON.parse(cachedData)); // Serve cached response
  }

  try {
    // Fetch from database correctly
    const eventData = await prisma.event.findMany({
      where: {
        eventName: eventName,
        appId: appId ? appId : undefined, // Optional filter
        timestamp: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
    });

    // Store result in Redis with expiry time of 1 hour
    await redis.setex(cacheKey, 3600, JSON.stringify(eventData));

    return res.json(eventData);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
