import express from "express";
import router from express.Router();

import { cartControllers } from "../controllers/cart.js"

import {
    verifyUser,
    verifyAdmin,
    verifyUserAndAdmin,
} from "../controllers/middlewares.js";

router.post("/add", verifyUser, cartControllers.addCart);

router.put("/upd/:id", verifyUserAndAdmin, cartControllers.updCart)

router.delete("/del/:id", verifyAdmin, cartControllers.delCart)

router.get("/find", verifyUserAndAdmin, cartControllers.findCart)
