import express from "express";
import { MongoBatchReExecutionError } from "mongodb";
import Hotel from "../models/Hotel.js";

const router = express.Router();

router.post("/new", async (req, res, next) => {

    const newHotel = new Hotel(req.body);
    
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
        //await insert
    } catch (error) {
        next(error)
    }
})

router.get("/select/:id", async (req, res, next) => {

    console.log("im an hotel route")

    try {
        const hotel = 
            await Hotel.findById(req.params.id);  

        res.status(200).json(hotel);
        //await insert
    } catch (error) {
        next(error)
    }
})

router.put("/update/:id", async (req, res, next) => {

    try {
        const updateHotel = 
            await Hotel.findByIdAndUpdate(req.params.id,         //where
                                          { $set: req.body },    //update
                                          { new: true });        //return new version

        res.status(200).json(updateHotel);
        //await insert
    } catch (error) {
        next(error)
    }
})

router.delete("/delete/:id", async (req, res, next) => {

    try {
        const deleteHotel = 
            await Hotel.findByIdAndDelete(req.params.id)     //where
                                          
        res.status(200).json(deleteHotel);
        //await insert
    } catch (error) {
        next(error)
    }
})


router.get("/hotels", (req, res) => {
    res.send("auth route from booking2022")
})

export default router