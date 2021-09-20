import { Quote } from "../../schemas/quote/quote";
import Logger from "../../utils/logger";

export default () => {
  const _3DaysAgo = new Date().getDate() - 3;

  Quote.deleteMany({ created_at: { $lt: _3DaysAgo } })
    .then(() => new Logger().info("All old records were deleted Quote"))
    .catch((err: any) => new Logger().info(err.message));
};
