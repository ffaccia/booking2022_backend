import express from "express";

const router = express.Router();

import { authControllers } from "../controllers/auth.js";
import {
  verifyUser,
  verifyAdmin,
  verifyUserAndAdmin,
} from "../controllers/middlewares.js";

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.put("/:id", verifyUser, authControllers.updateUser);

router.delete("/:id", verifyUser, authControllers.deleteUser);


export default router;
