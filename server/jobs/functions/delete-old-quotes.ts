import moment from "moment";
import { Quote } from "../../schemas/quote";
import Logger from "../../utils/logger";

export default () => {
  const _15DaysAgo = moment().subtract(15, "days").toDate();
  Quote.deleteMany({ created_at: { $lte: _15DaysAgo } })
    .then(() => new Logger().info("All old records were deleted Quote"))
    .catch((err: any) => new Logger().info("delete-old-quotes - " + err));
};
