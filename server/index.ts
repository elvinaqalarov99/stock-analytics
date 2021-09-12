import rp from "request-promise";
import Crypto from "../interfaces/crypto";
import express, { Request, Response, Application } from "express";
import CryptoModel from "../models/crypto";

const PORT = process.env.PORT || 3001;

const app: Application = express();

app.get("/api", (req: Request, res: Response): void => {
  // token e0b3bc59-b57f-4946-8971-72fea7cd508c
  // url   pro-api.coinmarketcap.com

  const requestOptions = {
    method: "GET",
    uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    qs: {
      start: "1",
      limit: "100",
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((response): void => {
      let data: Crypto[] = [];

      response?.data?.forEach((element: Crypto) => {
        const crypto: Crypto = new CryptoModel(
          element?.id,
          element?.cmc_rank,
          element?.date_added,
          element?.name,
          element?.circulating_supply,
          element?.quote
        );

        data.push(crypto);
      });

      function sortByDateAdded(a: Crypto, b: Crypto) {
        if (a.date_added < b.date_added) {
          return 1;
        }
        if (a.date_added > b.date_added) {
          return -1;
        }
        return 0;
      }

      data = data.sort(sortByDateAdded);

      res.json(data);
    })
    .catch((err): void => {
      res.json(err.message);
    });
});

app.listen(PORT, (): void => {
  console.log("Running on PORT " + PORT);
});
