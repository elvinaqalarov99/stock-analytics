import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cryptos from "./routes/cryptos";
import quotes from "./routes/quotes";
import mongoose from "mongoose";
import Logger from "./utils/logger";
import { deleteOldQuotesHanlder, fetchCryptosHandler } from "./jobs/jobs";
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = +process.env.PORT || 3001;

const MONGODB_URL: string = process.env.MONGODB_URL || "";

const app: Application = express();

mongoose
  .connect(MONGODB_URL, { maxPoolSize: 4 })
  .then(() => {
    app.listen(PORT, (): void => {
      console.log("Running on PORT " + PORT);
    });

    // jobs to handle quotes and cryptos
    fetchCryptosHandler();
    deleteOldQuotesHanlder();
  })
  .catch((err: any) => {
    new Logger().error("mongoose db connection - " + err);
  });

app.use(helmet());
app.use(cors());
app.use(express.json());

//cryptos routes enabled
app.use("/api/cryptos", cryptos);
app.use("/api/quotes", quotes);
