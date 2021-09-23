import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import cryptos from "./routes/cryptos";
import quotes from "./routes/quotes";
import mongoose from "mongoose";
import Logger from "./utils/logger";
import { deleteOldQuotesHanlder, fetchCryptosHandler } from "./jobs/jobs";

dotenv.config();

if (!process.env.NODE_DOCKER_PORT) {
  process.exit(1);
}

const PORT: number = +process.env.NODE_DOCKER_PORT || 8080;
const ORIGIN: string = process.env.CLIENT_ORIGIN || "http://127.0.0.1:8081";

const corsOptions: CorsOptions = {
  methods: "GET",
  optionsSuccessStatus: 200,
  origin: ORIGIN,
};

// const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build");

const MONGODB_URL: string = process.env.MONGODB_URL || "";

const app: Application = express();

// app.use(express.static(CLIENT_BUILD_PATH));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

//cryptos routes
app.use("/api/cryptos", cryptos);
app.use("/api/quotes", quotes);

mongoose
  .connect(MONGODB_URL, { maxPoolSize: 4 })
  .then((): void => {
    app.listen(PORT, (): void => {
      console.log("Running on PORT " + PORT + ". ORIGIN: " + ORIGIN);
    });

    // jobs to handle quotes and cryptos
    fetchCryptosHandler();
    deleteOldQuotesHanlder();
  })
  .catch((err: any) => {
    new Logger().error("mongoose db connection - " + err);
    process.exit();
  });

app.get("/", function (req, res) {
  // res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
  res.json({ message: "Welcome to crypto application." });
});
