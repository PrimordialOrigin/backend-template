import express, { NextFunction, Request, Response } from "express";
import { ErrorHandler, handleError } from "./middleware/error.middleware";
import routes from "./routes";
import { prisma } from "./db/config";
import { logger } from "./logger";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();

app.use(cors({
  origin: '*', // Will have to get a domain name, to avoid using All Origins
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],  // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Specify allowed headers
}));

app.use(bodyParser.json());
app.use("/api", routes);
app.use(
  (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
    handleError(err, res);
  }
);

const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    logger.debug("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database!");
  }
};

checkDatabaseConnection();

export default app;