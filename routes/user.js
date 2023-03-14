import express from "express";

const router = express.Router();

router.get("/login", (req, res, next) => {
  res.send("sempre tutt'ok");
});

router.post("/loginpost", (req, res, next) => {
  const username = req.body.username;
  res.send(`user vale ${username}`);
});

export default router;
