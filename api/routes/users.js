import express from "express";

const router = express.Router();

router.get("/users", (req, res) => {
    res.send("auth route from booking2022")
})

export default router