import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import router from "./routes";
import { botProtectionMiddleware } from "./middlewares/arject.middleware";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(botProtectionMiddleware);

app.use(config.BASE_PATH, router);
app.use(errorHandler);
app.listen(config.PORT, async () => {
  console.log(
    `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
  await connectDatabase();
});
