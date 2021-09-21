import rp from "request-promise";
import CryptoModel from "../models/crypto.model";
import QuoteModel from "../models/quote.model";
import { ICrypto } from "../interfaces/crypto.interface";
import { IQuote } from "../interfaces/quote.interface";
import { Crypto } from "../schemas/crypto";
import { Quote } from "../schemas/quote";
import Logger from "../utils/logger";

export default () => {
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
    .then(async (response) => {
      //delete all records from Crypto collection to load everything from the scratch
      await Crypto.deleteMany({});

      response?.data?.forEach(async (element: any) => {
        const crypto: ICrypto = new CryptoModel(
          element?.id,
          element?.cmc_rank,
          element?.date_added,
          element?.name,
          element?.symbol,
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

        new Crypto(crypto).save((err): void => {
          if (err) new Logger().error(err.message);
          new Quote(quote).save((err): void => {
            if (err) new Logger().error(err.message);
          });
        });
      });

      new Logger().info("All records were updated in Crypto and Quote");
    })
    .catch((err: any): void => {
      new Logger().error("fetch-cryptos - " + err);
    });
};
