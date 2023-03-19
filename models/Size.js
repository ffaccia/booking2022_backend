import mongoose from "mongoose";

import { boolean } from "webidl-conversions";
import { CreateError } from "../controllers/errors.js";


const SizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      uppercase: true,
    },
    desc: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Size", SizeSchema);
