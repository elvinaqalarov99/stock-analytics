import mongoose from "mongoose";
import { IQuote } from "../interfaces/quote.interface";

const Schema = mongoose.Schema;

const QuoteSchema = new Schema<IQuote>(
  {
    crypto_id: { type: Number, required: true },
    fully_diluted_market_cap: { type: Number, required: true },
    last_updated: { type: String, required: true },
    market_cap: { type: Number, required: true },
    market_cap_dominance: { type: Number, required: true },
    percent_change_24h: { type: Number, required: true },
    percent_change_7d: { type: Number, required: true },
    percent_change_30d: { type: Number, required: true },
    percent_change_60d: { type: Number, required: true },
    price: { type: Number, required: true },
    volume_24h: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Quote = mongoose.model<IQuote>("Quote", QuoteSchema);
