import express from "express";
import { roomRes } from "../controllers/rooms.js"

const router = express.Router();

/* :id stands for hotel id */
router.route("/insert/:id").post(roomRes.insertRoom)

router.route("/delete/:id/:room").delete(roomRes.deleteRoom)

router.route("/update").post(roomRes.updateRoom)
router.route("/availability/:id").put(roomRes.updateRoomAvailability);

export default router