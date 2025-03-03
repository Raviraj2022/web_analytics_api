import prisma from "../prismaClient.js";

/**
 * @desc Register a new app
 * @route POST /api/apps
 */
export const registerApp = async (req, res) => {
  try {
    const { userId, name } = req.body;

    // Validate user existence
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    console.log(userExists);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new app
    const newApp = await prisma.app.create({
      data: { userId, name },
    });

    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get all apps for a user
 * @route GET /api/apps/user/:userId
 */
export const getUserApps = async (req, res) => {
  try {
    const { userId } = req.params;

    const apps = await prisma.app.findMany({
      where: { userId: parseInt(userId) },
      include: { apiKeys: true, events: true },
    });

    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get a single app by ID
 * @route GET /api/apps/:appId
 */
export const getAppById = async (req, res) => {
  try {
    const { appId } = req.params;

    const app = await prisma.app.findUnique({
      where: { id: parseInt(appId) },
      include: { apiKeys: true, events: true },
    });

    if (!app) return res.status(404).json({ error: "App not found" });

    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Update an app
 * @route PUT /api/apps/:appId
 */
export const updateApp = async (req, res) => {
  try {
    const { appId } = req.params;
    const { name } = req.body;

    const updatedApp = await prisma.app.update({
      where: { id: parseInt(appId) },
      data: { name },
    });

    res.status(200).json(updatedApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete an app
 * @route DELETE /api/apps/:appId
 */
export const deleteApp = async (req, res) => {
  try {
    const { appId } = req.params;

    await prisma.app.delete({ where: { id: parseInt(appId) } });

    res.status(200).json({ message: "App deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
