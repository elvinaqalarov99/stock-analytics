import express, { Request, Response, Router } from "express";
import { Crypto } from "../schemas/crypto";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.json(await Crypto.find().sort({ id: -1 }));
});

export default router;
