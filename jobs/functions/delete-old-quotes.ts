import { Quote } from "../../schemas/quote/quote";
import Logger from "../../utils/logger";

export default () => {
  Quote.deleteMany({ created_at: { $lt: new Date().getDate() - 3 } })
    .then(() => new Logger().info("All old records were deleted Quote"))
    .catch((err: any) =>
      new Logger().info("delete-old-quotes - " + err.message)
    );
};
