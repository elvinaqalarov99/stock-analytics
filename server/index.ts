import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cryptos from "../routes/crypto/cryptos";
import mongoose from "mongoose";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = +process.env.PORT || 3001;

const MONGODB_URL: string = process.env.MONGODB_URL || "";

const app: Application = express();

mongoose
  .connect(MONGODB_URL)
  .then(() =>
    app.listen(PORT, (): void => {
      console.log("Running on PORT " + PORT);
    })
  )
  .catch((err) => console.log(err));

app.use(helmet());
app.use(cors());
app.use(express.json());

//cryptos routes enabled
app.use("/cryptos", cryptos);
