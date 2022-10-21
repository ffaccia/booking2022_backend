import express from "express";
import {
    userRes
} from "../controllers/users.js";

import { verifyToken, verifyUser } from "../controllers/middlewares.js"

const router = express.Router();

router.get("/checkauth", verifyToken, (req, res, next) => {
    res.send("you are authenticated!")
})


router.get("/:id", userRes.getUser)

router.delete("/delete/:id", userRes.deleteUser)

router.patch("/update/:id", verifyUser, userRes.updateUser)

router.put("/updateput/:id", userRes.updateUser)

router.get("/", userRes.getUsers)

export default router