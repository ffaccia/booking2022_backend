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

router.put("/upd/:id", verifyAdmin, productControllers.updProduct)

router.delete("/del/:id", verifyAdmin, productControllers.delProduct)

router.get("/find/", productControllers.findProduct)

export default router