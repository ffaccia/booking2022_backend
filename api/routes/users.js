import express from "express";
import { userRes } from "../controllers/users.js"

const router = express.Router();

router.post("/new", userRes.register2)

export default router