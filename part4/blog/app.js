import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";
import logger from "./utils/logger.js";
import blogsRouter from "./controllers/blogs.js";

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
