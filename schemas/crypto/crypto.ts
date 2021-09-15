import mongoose from "mongoose";
import { ICrypto } from "../../interfaces/crypto/crypto.interface";

const Schema = mongoose.Schema;

const CryptoSchema = new Schema<ICrypto>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    circulating_supply: { type: Number, required: true },
    date_added: { type: String, required: true },
    cmc_rank: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Crypto = mongoose.model<ICrypto>("Crypto", CryptoSchema);
