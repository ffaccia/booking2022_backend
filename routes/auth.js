import express from "express";

const router = express.Router();

import { authControllers } from "../controllers/auth.js";
import { verifyUser, verifyUserAndAdmin } from "../controllers/middlewares.js";

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.put("/:id", verifyUser, authControllers.updateUser);

export default router;
