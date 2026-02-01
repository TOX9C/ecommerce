import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// CORS configuration
export const corsMiddleware = cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    optionsSuccessStatus: 200,
});

// Helmet configuration for security headers
export const helmetMiddleware = helmet();

// Rate limiter for authentication endpoints
export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Increased limit for dev/debugging
    message: "Too many authentication attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

// General API rate limiter
export const apiRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per minute
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});
