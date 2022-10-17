import express from "express";
import {
    userRes
    } from "../controllers/users.js";

const router = express.Router();

router.delete("/delete/:id", userRes.deleteUser)

export default router