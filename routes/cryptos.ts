import express, { Request, Response, Router } from "express";
import rp from "request-promise";
import CryptoModel from "../models/cryptos/crypto.model";
import Crypto from "../interfaces/cryptos/crypto.interface";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  const URL: string = process.env.COINMARKETCAP_URL || "";
  const KEY: string = process.env.COINMARKETCAP_KEY || "";

  const requestOptions = {
    method: "GET",
    uri: URL,
    qs: {
      start: "1",
      limit: "100",
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": KEY,
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

export default router;
