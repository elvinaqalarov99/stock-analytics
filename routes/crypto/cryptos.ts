import express, { Request, Response, Router } from "express";
import rp from "request-promise";
import CryptoModel from "../../models/crypto/crypto.model";
import { ICrypto } from "../../interfaces/crypto/crypto.interface";
import sortByDateAdded from "../../utils/sort";

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
      let data: ICrypto[] = [];

      response?.data?.forEach((element: ICrypto) => {
        const crypto: ICrypto = new CryptoModel(
          element?.id,
          element?.cmc_rank,
          element?.date_added,
          element?.name,
          element?.circulating_supply,
          element?.quote
        );

        data.push(crypto);
      });

      data = data.sort(sortByDateAdded<ICrypto, "date_added">("date_added"));
      res.json(data);
    })
    .catch((err): void => {
      res.json(err.message);
    });
});

export default router;
