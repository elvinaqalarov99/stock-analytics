import express, { Request, Response, Router } from "express";
import { Quote } from "../schemas/quote";

const router: Router = express.Router();

router.get("/:cryptoId", async (req: Request, res: Response) => {
  res.json(
    await Quote.find({ crypto_id: +req.params.cryptoId }).sort({
      last_updated: 1,
    })
  );
});

export default router;
