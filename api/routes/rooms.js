import express from "express";

const router = express.Router();

router.get("/rooms", (req, res) => {
    res.send("auth route from booking2022")
})

export default router