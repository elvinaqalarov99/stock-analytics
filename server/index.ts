import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cryptos from "../routes/crypto/cryptos";
import quotes from "../routes/quote/quotes";

import mongoose from "mongoose";
import cron from "node-cron";
import fetchCryptos from "../jobs/fetch-cryptos";
import Logger from "../utils/logger";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = +process.env.PORT || 3001;

const MONGODB_URL: string = process.env.MONGODB_URL || "";

const app: Application = express();

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, (): void => {
      console.log("Running on PORT " + PORT);
    });

    // cron.schedule("*/6 * * * *", () => {
    //   fetchCryptos();
    // });
  })
  .catch((err) => new Logger().error(err.message));

app.use(helmet());
app.use(cors());
app.use(express.json());

//cryptos routes enabled
app.use("/api/cryptos", cryptos);
app.use("/api/quotes", quotes);
