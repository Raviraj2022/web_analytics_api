import prisma from "../prismaClient.js";

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
