import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1", // Change to your Redis host if different
  port: 6379, // Default Redis port
});

redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis Error:", err));

export default redis;
