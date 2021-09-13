import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cryptos from "../routes/cryptos";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = +process.env.PORT;

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

//cryptos routes enabled
app.use("/cryptos", cryptos);

app.listen(PORT, (): void => {
  console.log("Running on PORT " + PORT);
});
