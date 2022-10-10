import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        //await insert
    } catch (error) {

    }
})


router.get("/hotels", (req, res) => {
    res.send("auth route from booking2022")
})

export default router