import express, { Request, Response, Router } from "express";
import rp from "request-promise";
import CryptoModel from "../../models/crypto/crypto.model";
import QuoteModel from "../../models/quote/quote.model";
import { ICrypto } from "../../interfaces/crypto/crypto.interface";
import sortByID from "../../utils/sort";
import { IQuote } from "../../interfaces/quote/quote.interface";

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
      let cryptos: ICrypto[] = [];
      let quotes: IQuote[] = [];

      response?.data?.forEach((element: any) => {
        const crypto: ICrypto = new CryptoModel(
          element?.id,
          element?.cmc_rank,
          element?.date_added,
          element?.name,
          element?.circulating_supply
        );

        const baseQuote = element?.quote?.USD;
        const quote: IQuote = new QuoteModel(
          element?.id,
          baseQuote?.fully_diluted_market_cap,
          baseQuote?.last_updated,
          baseQuote?.market_cap,
          baseQuote?.market_cap_dominance,
          baseQuote?.percent_change_24h,
          baseQuote?.percent_change_7d,
          baseQuote?.percent_change_30d,
          baseQuote?.percent_change_60d,
          baseQuote?.price,
          baseQuote?.volume_24h
        );

        cryptos.push(crypto);
        quotes.push(quote);
      });

      // res.json(cryptos.sort(sortByID<ICrypto, "id">("id")));
      res.json(quotes.sort(sortByID<IQuote, "crypto_id">("crypto_id")));
    })
    .catch((err): void => {
      res.json(err.message);
    });
});

export default router;
