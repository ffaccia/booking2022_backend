import express from "express";

const router = express.Router();

router.get("/auth", (req, res, next) => {
  res.send("auth sempre tutt'ok");
});

export default router;
