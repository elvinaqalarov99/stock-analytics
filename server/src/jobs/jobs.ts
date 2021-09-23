import cron from "node-cron";
import fetchCryptos from "./functions/fetch-cryptos";
import deleteOldQuotes from "./functions/delete-old-quotes";

// run every 6 minutes
export const fetchCryptosHandler = () =>
  cron.schedule("*/5 * * * *", () => fetchCryptos());

// run every midnight
export const deleteOldQuotesHanlder = () =>
  cron.schedule("0 0 0 * * *", () => deleteOldQuotes());
