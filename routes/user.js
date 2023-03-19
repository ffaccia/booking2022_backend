import express from "express";
import { authControllers } from "../controllers/user.js";
import {
  verifyUser,
  verifyAdmin,
  verifyUserAndAdmin,
} from "../controllers/middlewares.js";

const router = express.Router();

//find single user
router.get("/find/:id", verifyUser, authControllers.getUser);

//find all users
router.get("/users/", verifyAdmin, authControllers.getAllUser);

//get stats
router.get("/stats/", verifyAdmin, authControllers.getStats);

//get stats
router.get("/stats2/", verifyAdmin, authControllers.getStats2);

router.get("/login", (req, res, next) => {
  res.send("sempre tutt'ok");
});

router.post("/loginpost", (req, res, next) => {
  const username = req.body.username;
  res.send(`user vale ${username}`);
});

export default router;
