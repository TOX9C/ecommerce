import express from "express";
import { corsMiddleware, helmetMiddleware, apiRateLimiter } from "./middleware/security";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Security middleware
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(apiRateLimiter);

// Body parser
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

import authRouter from "./routes/authRouter";
import productRouter from "./routes/productRouter";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";

// API routes with versioning
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
