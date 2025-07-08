import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  MONGO_URI: getEnv("MONGO_URI", ""),
  JWT_SECRET: getEnv("JWT_SECRET", ""),
  FRONTEND_URL: getEnv("FRONTEND_URL", "http://localhost:5173"),
  SEND_GRID_API_KEY: getEnv("SEND_GRID_API_KEY", ""),
  FROM_EMAIL: getEnv("FROM_EMAIL", "hoangtrung7762@gmail.com"),
  ARCJET_KEY: getEnv("ARCJET_KEY", ""),
});

export const config = appConfig();
