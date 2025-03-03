import express from "express";
import dotenv from "dotenv";
import http from 'http';
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import apiKeyRoutes from "./routes/apiKeyRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import setupSwagger from "./swaggerConfig.js";


dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(express.json());
setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/key", apiKeyRoutes);
app.use("/api/apps", appRoutes);

// console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV !== "test") {
//     const PORT = process.env.PORT || 5000;
//     server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export {app, server};
