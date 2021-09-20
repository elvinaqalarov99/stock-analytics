import cron from "node-cron";
import fetchCryptos from "./functions/fetch-cryptos";
import deleteOldQuotes from "./functions/delete-old-quotes";

export const fetchCryptosHandler = () =>
  cron.schedule("*/6 * * * *", () => {
    fetchCryptos();
  });

export const deleteOldQuotesHanlder = () =>
  cron.schedule("0 0 0 * *", () => {
    deleteOldQuotes();
  });
