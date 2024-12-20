import logger from "./logger.js";

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: error.message });
};

const unknownEndpoint = (req, res) => {
  res.status(400).json({ error: "unknown endpoint" });
};

export default {
  errorHandler,
  unknownEndpoint,
};
