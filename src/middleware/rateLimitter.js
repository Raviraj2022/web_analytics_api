import rateLimit from "express-rate-limit";

// Rate limiting for event submission (e.g., 100 requests per 15 minutes per IP)
export const eventRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Too many event requests, please try again later." },
  headers: true,
});

// Rate limiting for event retrieval (e.g., 50 requests per 10 minutes per IP)
export const retrievalRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: { error: "Too many requests for event data, please try again later." },
  headers: true,
});
