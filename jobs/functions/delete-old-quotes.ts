import moment from "moment";
import { Quote } from "../../schemas/quote/quote";
import Logger from "../../utils/logger";

export default () => {
  const _3DaysAgo = moment().subtract(10, "days").toDate();
  Quote.deleteMany({ created_at: { $lte: _3DaysAgo } })
    .then(() => new Logger().info("All old records were deleted Quote"))
    .catch((err: any) => new Logger().info("delete-old-quotes - " + err));
};
