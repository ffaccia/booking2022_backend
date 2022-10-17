import express from "express";
import { authRes } from "../controllers/auth.js"

const router = express.Router();

router.route("/register").post(authRes.register)

router.route("/login").post(authRes.login)

export default router

