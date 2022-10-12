import express from "express";
import { userRes } from "../controllers/users.js"

const router = express.Router();

router.post("/register", userRes.register)

router.post("/login", userRes.login)

export default router