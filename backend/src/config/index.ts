// Validate required environment variables
const requiredEnvVars = ["DATABASE_URL", "JWT_CODE"];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

// Export typed configuration
export const config = {
    port: parseInt(process.env.PORT || "3000", 10),
    jwtSecret: process.env.JWT_CODE!,
    databaseUrl: process.env.DATABASE_URL!,
    nodeEnv: process.env.NODE_ENV || "development",
    corsOrigin: process.env.CORS_ORIGIN || "*",
} as const;
