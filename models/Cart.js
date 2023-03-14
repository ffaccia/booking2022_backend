import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { boolean } from "webidl-conversions";
import { CreateError } from "../controllers/errors.js";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
