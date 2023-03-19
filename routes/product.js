import express from "express";
const router = express.Router();

import { productControllers } from "../controllers/product.js";

import {
  verifyUser,
  verifyAdmin,
  verifyDummy,
  verifyUserAndAdmin,
} from "../controllers/middlewares.js";

router.post("/add", verifyAdmin, productControllers.addProduct)

router.put("/:id", verifyAdmin, productControllers.updProduct)

export default router