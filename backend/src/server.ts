import "dotenv/config";
import "./config"; // Validate environment variables
import app from "./app";
import { config } from "./config";

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Health check: http://localhost:${config.port}/health`);
});
