import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { boolean } from "webidl-conversions";
import { CreateError } from "../controllers/errors.js";
const SALT_WORK_FACTOR = 10;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    desc: {
      type: String,
      trim: true,
      required: true,
      //lowercase: true,
      minlength: 8,
      maxlength: 100,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      //required: true
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
